import { SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStateService } from '../services/blog-state.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  template: `
    <h1>Blog-Beitraege</h1>

    <div class="toolbar">
      <p>{{ state.blogCount() }} Blog-Beitraege</p>
      <label>
        Autor
        <select
          [value]="state.selectedAuthor()"
          (change)="setAuthor($any($event.target).value)"
        >
          <option value="all">Alle Autoren</option>
          @for (author of state.authors(); track author) {
            <option [value]="author">{{ author }}</option>
          }
        </select>
      </label>
    </div>

    @if (state.loading()) {
      <div class="status">
        <span class="spinner" aria-hidden="true"></span>
        <span>Blogs werden geladen...</span>
      </div>
    }

    @if (state.error()) {
      <p class="error">{{ state.error() }}</p>
    }

    <div class="blog-list">
      @for (blog of state.filteredBlogs(); track blog.id) {
        <article class="blog-card">
          <h2>
            <a [routerLink]="['/blogs', blog.id]">{{ blog.title }}</a>
          </h2>
          <p class="meta">{{ blog.author }} &middot; {{ blog.date }}</p>
          <p>{{ blog.content | slice: 0 : 120 }}...</p>
        </article>
      }
    </div>
  `,
  styles: [
    `
      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 24px;
      }

      label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }

      select {
        min-width: 180px;
        padding: 8px 10px;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 0;
      }

      .spinner {
        width: 18px;
        height: 18px;
        border: 3px solid #d5dce8;
        border-top-color: #1d4ed8;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .error {
        padding: 12px 16px;
        border-left: 4px solid #c62828;
        background: #ffebee;
        color: #c62828;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export default class BlogListComponent implements OnInit {
  protected readonly state = inject(BlogStateService);

  ngOnInit(): void {
    void this.state.loadBlogs();
  }

  setAuthor(author: string): void {
    this.state.setAuthor(author);
  }
}
