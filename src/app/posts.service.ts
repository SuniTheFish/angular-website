import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Post } from './post';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public static readonly postsUrl = '/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(PostsService.postsUrl).pipe(
      catchError(() => {
        console.error('failed to get posts');
        return [];
      }),
    );
  }

  createPost(post: Post): Observable<string> {
    return this.http.post<string>(PostsService.postsUrl, post).pipe(
      catchError(() => {
        console.error('failed to create post');
        return '';
      }),
    );
  }

  patchPost(id: string, content: Partial<Post>): Observable<boolean> {
    if (this.idIsValid(id)) {
      throw new RangeError('id must be of length 24 and only contain hex characters');
    }
    return this.http.patch<boolean>(`${PostsService.postsUrl}/${id}`, content).pipe(
      map(() => true),
      catchError(() => {
        console.error('failed to patch post');
        return of(false);
      }),
    );
  }

  putPost(id: string, content: Post): Observable<boolean> {
    if (this.idIsValid(id)) {
      throw new RangeError('id must be of length 24 and only contain hex characters');
    }
    return this.http.put<boolean>(`${PostsService.postsUrl}/${id}`, content).pipe(
      map(() => true),
      catchError(() => {
        console.error('failed to put post');
        return of(false);
      }),
    );
  }

  deletePost(id: string): Observable<boolean> {
    if (this.idIsValid(id)) {
      throw new RangeError('id must be of length 24 and only contain hex characters');
    }
    return this.http.delete<boolean>(`${PostsService.postsUrl}/${id}`).pipe(
      map(() => true),
      catchError(() => {
        console.error('failed to delete post');
        return of(false);
      }),
    );
  }

  private idIsValid(id: string): boolean {
    return Boolean(id.length !== 24 || id.match(/[^0-9a-f]/i));
  }
}
