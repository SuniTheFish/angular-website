import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '../projects.service';
import { Project } from '../project';
import { doesNotReject } from 'assert';
import { CamelAddSpacesPipe } from '../camel-add-spaces.pipe';
import { DashToSpacePipe } from '../dash-to-space.pipe';
import { TitleCasePipe } from '@angular/common';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsData: Project[];
  let projectsSpy: jasmine.SpyObj<ProjectsService>;

  beforeEach(() => {
    projectsSpy = jasmine.createSpyObj('ProjectsService', ['getProjects']);
    projectsSpy.getProjects.and.returnValue(of(projectsData));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ ProjectsComponent, CamelAddSpacesPipe, DashToSpacePipe ],
      providers: [
        { provide: ProjectsService, useValue: projectsSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    projectsData = [
      {
        name: 'test-project-name',
        description: 'test-project-description',
        html_url: 'http://test-project-url/',
        homepage: 'http://test-project-homepage/'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has projects banner', () => {
    const rootDebug = fixture.debugElement;
    const h1Debug = rootDebug.query(By.css('.banner h1'));
    const h1: HTMLElement = h1Debug.nativeElement;
    expect(h1.textContent).toEqual('Projects',
      'projects banner does not exist');
  });

  it('displays projects correctly', () => {
    const rootDebug = fixture.debugElement;
    const projectsDebug = rootDebug.queryAll(By.css('.project'));
    projectsDebug.forEach((projectDebug, i) => {
      const { name, description, html_url, homepage } = projectsData[i];
      const nameTransformed = new TitleCasePipe().transform(new CamelAddSpacesPipe().transform(new DashToSpacePipe().transform(name)));
      const titleElement: HTMLLinkElement = projectDebug.query(By.css('h2 a')).nativeElement;
      expect(titleElement.textContent).toEqual(nameTransformed);
      expect(titleElement.href).toEqual(homepage);
      const subtitleElement: HTMLLinkElement = projectDebug.query(By.css('h3 a')).nativeElement;
      expect(subtitleElement.href).toEqual(html_url);
      const descriptionElement: HTMLElement = projectDebug.query(By.css('p')).nativeElement;
      expect(descriptionElement.textContent).toEqual(description);
    });
  });
});
