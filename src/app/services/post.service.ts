import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostCreateInput } from '../data/post';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}api/v1/posts`);
  }

  createPost(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}api/v1/posts`, post);
  }
}