import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let paths: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    paths = ['/', '/projects'].map((str) => window.origin + str);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct pages', () => {
    const rootDebug = fixture.debugElement;
    const linksDebugs = rootDebug.queryAll(By.css('nav ul li a'));
    linksDebugs.forEach((linkDebug) => {
      const link: HTMLLinkElement = linkDebug.nativeElement;
      expect(paths.includes(link.href)).toBeTruthy();
    });
  });
});
