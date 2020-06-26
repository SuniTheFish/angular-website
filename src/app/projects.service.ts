import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private cache?: Observable<Project[]> = null;
  private projectsUrl = 'https://api.github.com/users/SuniTheFish/repos';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    if (this.cache) {
      return this.cache;
    }

    return this.cache = this.http.get<Project[]>(this.projectsUrl).pipe(
      shareReplay(1),
      catchError(() => {
        this.cache = null;
        return EMPTY;
      })
    );
  }
}
