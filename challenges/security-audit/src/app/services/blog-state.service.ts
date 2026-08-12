import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Blog } from '../data/blogs';
import { BlogBackendService } from './blog-backend.service';

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  selectedAuthor: string;
}

const AUTHOR_STORAGE_KEY = 'blog-selected-author';

@Injectable({ providedIn: 'root' })
export class BlogStateService {
  private readonly blogBackend = inject(BlogBackendService);

  readonly #state = signal<BlogState>({
    blogs: [],
    loading: false,
    error: null,
    selectedAuthor: this.#readSelectedAuthor(),
  });

  readonly blogs = computed(() => this.#state().blogs);
  readonly loading = computed(() => this.#state().loading);
  readonly error = computed(() => this.#state().error);
  readonly selectedAuthor = computed(() => this.#state().selectedAuthor);
  readonly blogCount = computed(() => this.blogs().length);
  readonly authors = computed(() => [
    ...new Set(this.blogs().map((blog) => blog.author)),
  ]);
  readonly filteredBlogs = computed(() => {
    const selectedAuthor = this.selectedAuthor();

    if (selectedAuthor === 'all') {
      return this.blogs();
    }

    return this.blogs().filter((blog) => blog.author === selectedAuthor);
  });

  readonly #persistSelectedAuthor = effect(() => {
    localStorage.setItem(AUTHOR_STORAGE_KEY, this.selectedAuthor());
  });

  async loadBlogs(): Promise<void> {
    this.#loadStarted();

    try {
      const blogs = await this.blogBackend.getBlogs();
      this.#loadSucceeded(blogs);
    } catch {
      this.#loadFailed('Blog-Beitraege konnten nicht geladen werden.');
    }
  }

  setAuthor(author: string): void {
    this.#authorSelected(author);
  }

  #loadStarted(): void {
    this.#state.update((state) => ({ ...state, loading: true, error: null }));
  }

  #loadSucceeded(blogs: Blog[]): void {
    this.#state.update((state) => ({ ...state, blogs, loading: false }));
  }

  #loadFailed(message: string): void {
    this.#state.update((state) => ({
      ...state,
      error: message,
      loading: false,
    }));
  }

  #authorSelected(author: string): void {
    this.#state.update((state) => ({ ...state, selectedAuthor: author }));
  }

  #readSelectedAuthor(): string {
    return localStorage.getItem(AUTHOR_STORAGE_KEY) ?? 'all';
  }
}
