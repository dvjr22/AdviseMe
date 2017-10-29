import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(route: string) {
    return browser.get(route);
  }

  getParagraphText() {
    return element(by.css('app-root h2')).getText();
  }

  login(username: string, password: string) {
    element(by.css('#inputEmail')).sendKeys(username);
    element(by.css('#inputPassword')).sendKeys(password);
    element(by.css('input')).click();
    expect(this.getParagraphText()).toEqual('Please sign in');
  }

  register(name: string, username: string, password: string) {
    element(by.css('#name')).sendKeys(name);
    element(by.css('#username')).sendKeys(username);
    element(by.css('#password')).sendKeys(password);
    element(by.css('#submitBtn')).click();
    expect(this.getParagraphText()).toEqual('Please sign in');
  }
}
