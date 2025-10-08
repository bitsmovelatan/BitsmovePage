import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Story {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  isAnonymous: boolean;
  likes: number;
  language: string;
  createdAt: string;
}

export interface StoriesResponse {
  success: boolean;
  stories: Story[];
  count: number;
  total: number;
  page: number;
  pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor(private http: HttpClient) {}

  getStories(language?: string, page: number = 1): Observable<StoriesResponse> {
    const params: any = { page };
    if (language) params.language = language;
    
    return this.http.get<StoriesResponse>(`${environment.apiUrl}/stories`, { params });
  }

  createStory(story: {
    title: string;
    content: string;
    isAnonymous: boolean;
    language?: string;
  }): Observable<{ success: boolean; story: Story }> {
    return this.http.post<{ success: boolean; story: Story }>(
      `${environment.apiUrl}/stories`,
      story
    );
  }

  likeStory(id: string): Observable<{ success: boolean; likes: number }> {
    return this.http.put<{ success: boolean; likes: number }>(
      `${environment.apiUrl}/stories/${id}/like`,
      {}
    );
  }

  deleteStory(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${environment.apiUrl}/stories/${id}`
    );
  }
}

