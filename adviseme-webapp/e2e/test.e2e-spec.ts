import { browser, by, element } from 'protractor';

describe('Login System', () => {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get('/');
  });
  // it('should display the name of the application', () => {
  //   // The app is up and running
  //   expect(element(by.css('.title')).getText()).toContain('AdviseMe');
  // });
  //
  // it('should render the login form', () => {
  //   // The username, password, and login button should appear
  //   expect(element(by.id('input-username')).isPresent()).toBeTruthy('The username field should appear');
  //   expect(element(by.id('input-password')).isPresent()).toBeTruthy('The password field should appear');
  //   expect(element(by.css('.btn-block')).isPresent()).toBeTruthy('The Sign in button should appear');
  // });

  // it('should not allow an invalid login', () => {
  //   // Fill out the form with invalid credentials
  //   login('thisisinvalid', 'wrongpassword');
  //   expect(element(by.css('.btn-block')).isPresent()).toBeTruthy('Login should not have worked');
  // });
  //
  // it('should allow a valid login', () => {
  //   login('student', '1234');
  //   expect(element(by.css('.title')).isPresent()).toBeTruthy('Login should have worked');
  // });
});

describe('Dashboard', () => {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get('/');
    login('student', '1234');
  });

  it('should have a cart', () => {
    browser.get('/pages/cart');
    element(by.id('submitBtn')).click();
    expect(element(by.css('.btn-group-full-width')).isPresent()).toBeTruthy('Should be at the request status');
  });
});




function login(username: string, password: string) {
  element(by.id('input-username')).sendKeys(username);
  element(by.id('input-password')).sendKeys(password);
  // browser.waitForAngularEnabled(true);
  element(by.css('.btn-block')).click();
}
