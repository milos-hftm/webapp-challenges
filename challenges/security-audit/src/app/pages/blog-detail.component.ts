import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogStateService } from '../services/blog-state.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (state.loading()) {
      <p>Blog-Beitrag wird geladen...</p>
    } @else if (state.error()) {
      <p>{{ state.error() }}</p>
    } @else if (blog()) {
      <article>
        <h1>{{ blog()?.title }}</h1>
        <p class="meta">{{ blog()?.author }} &middot; {{ blog()?.date }}</p>
        <p>{{ blog()?.content }}</p>
      </article>
      <hr />
      <h3>Weitere Beitraege</h3>
      <ul>
        @for (other of otherBlogs(); track other.id) {
          <li>
            <a [routerLink]="['/blogs', other.id]">{{ other.title }}</a>
          </li>
        }
      </ul>
    } @else {
      <p>Blog-Beitrag nicht gefunden.</p>
    }
    <a routerLink="/blogs" class="back-link">&larr; Zurueck zur Uebersicht</a>
  `,
})
export default class BlogDetailComponent implements OnInit {
  protected readonly state = inject(BlogStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly blogId = signal<number | null>(null);

  protected readonly blog = computed(() => {
    const id = this.blogId();

    if (id === null) {
      return undefined;
    }

    return this.state.blogs().find((blog) => blog.id === id);
  });

  protected readonly otherBlogs = computed(() => {
    const id = this.blogId();

    if (id === null) {
      return [];
    }

    return this.state.blogs().filter((blog) => blog.id !== id);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId.set(Number(params.get('id')));
    });

    if (this.state.blogs().length === 0) {
      void this.state.loadBlogs();
    }
  }
}
