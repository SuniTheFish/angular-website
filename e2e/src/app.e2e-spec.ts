import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateToHome();
    expect(page.getTitleText()).toEqual('Welcome!');
  });

  it('should display projects message', () => {
    page.navigateToProjects();
    expect(page.getTitleText()).toEqual('Projects');
  });

  it('displays projects', () => {
    page.navigateToProjects();
    expect(element.all(by.className('project')).isPresent()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
