import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = 'https://api.github.com/users/SuniTheFish/repos';

  private projects: Project[] = [];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      catchError(this.handleError<Project[]>('getProjects', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    }
  }
}
