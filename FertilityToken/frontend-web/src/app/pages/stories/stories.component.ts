import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryService, Story } from '../../services/story.service';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="stories-page">
      <div class="container">
        <div class="stories-header">
          <h1>{{ t('stories.title') }}</h1>
          
          @if (isAuthenticated()) {
            <button (click)="showForm = !showForm" class="btn btn-primary">
              {{ showForm ? t('common.cancel') : t('stories.share') }}
            </button>
          }
        </div>

        @if (showForm && isAuthenticated()) {
          <div class="story-form card">
            @if (error) {
              <div class="alert alert-error">{{ error }}</div>
            }
            @if (success) {
              <div class="alert alert-success">{{ success }}</div>
            }

            <form (ngSubmit)="submitStory()">
              <div class="form-group">
                <label>{{ t('stories.titleField') }}</label>
                <input 
                  type="text" 
                  [(ngModel)]="newStory.title" 
                  name="title" 
                  required
                  maxlength="200"
                  [disabled]="loading"
                />
              </div>

              <div class="form-group">
                <label>{{ t('stories.contentField') }}</label>
                <textarea 
                  [(ngModel)]="newStory.content" 
                  name="content" 
                  rows="6"
                  required
                  maxlength="5000"
                  [disabled]="loading"
                ></textarea>
              </div>

              <div class="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    [(ngModel)]="newStory.isAnonymous" 
                    name="anonymous"
                    [disabled]="loading"
                  />
                  {{ t('stories.anonymous') }}
                </label>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="loading">
                @if (loading) {
                  <span class="loading"></span>
                }
                {{ t('stories.submit') }}
              </button>
            </form>
          </div>
        }

        @if (loadingStories) {
          <div class="loading-container">
            <div class="loading"></div>
          </div>
        }

        <div class="stories-grid">
          @for (story of stories; track story._id) {
            <div class="story-card card">
              <div class="story-header">
                <div class="story-author">
                  <span class="author-icon">👤</span>
                  <span>{{ story.authorName }}</span>
                </div>
                <span class="story-date">{{ formatDate(story.createdAt) }}</span>
              </div>
              
              <h3 class="story-title">{{ story.title }}</h3>
              <p class="story-content">{{ story.content }}</p>
              
              <div class="story-footer">
                <button (click)="likeStory(story)" class="like-btn">
                  ❤️ {{ story.likes }} {{ t('stories.likes') }}
                </button>
              </div>
            </div>
          }
        </div>

        @if (stories.length === 0 && !loadingStories) {
          <div class="empty-state">
            <p>No stories yet. Be the first to share!</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .stories-page {
      padding: 3rem 0;
    }

    .stories-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .story-form {
      margin-bottom: 3rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-group.checkbox label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-group.checkbox input {
      width: auto;
    }

    .stories-grid {
      display: grid;
      gap: 2rem;
    }

    .story-card {
      transition: transform 0.3s ease;
    }

    .story-card:hover {
      transform: translateY(-2px);
    }

    .story-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .story-author {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }

    .author-icon {
      font-size: 1.5rem;
    }

    .story-date {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .story-title {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .story-content {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }

    .story-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .like-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .like-btn:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 3rem 0;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .stories-header {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];
  newStory = {
    title: '',
    content: '',
    isAnonymous: false
  };
  showForm = false;
  loading = false;
  loadingStories = false;
  error = '';
  success = '';

  constructor(
    private storyService: StoryService,
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadStories();
  }

  t = (key: string) => this.languageService.translate(key);
  isAuthenticated = () => this.authService.isAuthenticated();

  loadStories() {
    this.loadingStories = true;
    const lang = this.languageService.currentLanguage();
    
    this.storyService.getStories(lang).subscribe({
      next: (response) => {
        this.stories = response.stories;
        this.loadingStories = false;
      },
      error: (err) => {
        console.error('Error loading stories:', err);
        this.loadingStories = false;
      }
    });
  }

  submitStory() {
    if (!this.newStory.title || !this.newStory.content) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const storyData = {
      ...this.newStory,
      language: this.languageService.currentLanguage()
    };

    this.storyService.createStory(storyData).subscribe({
      next: (response) => {
        this.success = 'Story shared successfully!';
        this.newStory = { title: '', content: '', isAnonymous: false };
        this.stories.unshift(response.story);
        this.loading = false;
        setTimeout(() => {
          this.showForm = false;
          this.success = '';
        }, 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to share story';
        this.loading = false;
      }
    });
  }

  likeStory(story: Story) {
    this.storyService.likeStory(story._id).subscribe({
      next: (response) => {
        story.likes = response.likes;
      },
      error: (err) => {
        console.error('Error liking story:', err);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}

