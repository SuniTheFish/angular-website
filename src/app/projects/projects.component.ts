import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public start = 0;
  public readonly size: number = 10;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.getProjects()
      .subscribe((projects) => this.projects = projects);
  }

  private pageExists(page: number): boolean {
    return page >= 0
      && page < Math.floor(this.projects.length / this.size);
  }
}
