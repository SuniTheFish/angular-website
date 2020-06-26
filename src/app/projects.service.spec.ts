import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpXhrBackend, HttpClientModule } from '@angular/common/http';

import { ProjectsService } from './projects.service';
import { Inject } from '@angular/core';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(ProjectsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of objects with correct props', (done) => {
    service.getProjects().subscribe((projects) => {
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      projects.forEach((project) => {
        expect(hasOwnProperty.call(project, 'name')).toBe(true);
        expect(hasOwnProperty.call(project, 'description')).toBe(true);
        expect(hasOwnProperty.call(project, 'html_url')).toBe(true);
      });
      done();
    });
  });
});
