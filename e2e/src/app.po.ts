import { browser, by, element, WebElement } from 'protractor';

export class AppPage {
  navigateToHome(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToProjects(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/projects`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .banner h1')).getText() as Promise<string>;
  }

  getProjectElements(): Promise<WebElement[]> {
    return browser.findElements(by.className('project')) as Promise<WebElement[]>;
  }
}
