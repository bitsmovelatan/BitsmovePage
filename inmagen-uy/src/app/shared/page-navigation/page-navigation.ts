import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService, PageNavigation as PageNav } from '../../services/navigation';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-page-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss'
})
export class PageNavigation implements OnInit {
  @Input() currentPath: string = '';
  
  navigation: PageNav = { previous: null, next: null };

  constructor(
    private navService: NavigationService,
    public translate: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.currentPath) {
      this.currentPath = this.router.url;
    }
    this.navigation = this.navService.getPageNavigation(this.currentPath);
  }

  navigateTo(path: string): void {
    this.navService.navigateToPage(path);
  }

  t(key: string): string {
    return this.translate.get(key);
  }
}
