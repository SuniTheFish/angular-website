import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private cache: Project[] = [];
  private projectsUrl = 'https://api.github.com/users/SuniTheFish/repos';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    if (!this.cache.length) {
      return this.http.get<Project[]>(this.projectsUrl).pipe(
        tap((projects) => this.cache = projects),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
    } else {
      return of(this.cache);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error('Error in operation', operation, ': ', err);
      return of(result as T);
    };
  }
}
