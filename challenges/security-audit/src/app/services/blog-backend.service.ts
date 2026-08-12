import { Injectable } from '@angular/core';
import { BLOGS, Blog } from '../data/blogs';

@Injectable({ providedIn: 'root' })
export class BlogBackendService {
  async getBlogs(): Promise<Blog[]> {
    return Promise.resolve([...BLOGS]);
  }
}
