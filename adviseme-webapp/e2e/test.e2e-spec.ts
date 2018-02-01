import { browser, by, element } from 'protractor';

describe('Login System', () => {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get('/');
  });
  it('should display the name of the application', () => {
    // The app is up and running
    expect(element(by.css('.title')).getText()).toContain('AdviseMe');
  });

  it('should render the login form', () => {
    // The username, password, and login button should appear
    expect(element(by.id('input-username')).isPresent()).toBeTruthy('The username field should appear');
    expect(element(by.id('input-password')).isPresent()).toBeTruthy('The password field should appear');
    expect(element(by.css('.btn-block')).isPresent()).toBeTruthy('The Sign in button should appear');
  });

  it('should not allow an invalid login', () => {
    // Fill out the form with invalid credentials
    element(by.id('input-username')).sendKeys('thisisaninvalidlogin');
    element(by.id('input-password')).sendKeys('wrongpassword');
    element(by.css('.btn-block')).click();

    // Expect the toast to appear
    expect(element(by.css('.toast')).isPresent()).toBeTruthy('The invalid login toast should appear');
  });

  it('should create a new login', () => {
    // Navigate to the registration
    browser.waitForAngularEnabled(true);
    element(by.id('signuplink')).click();
    expect(element(by.id('input-email')).isPresent()).toBeTruthy('The email field should appear to denote the registration screen');
    browser.waitForAngularEnabled(false);
    // Fill out the registration form
    element(by.id('input-username')).sendKeys('testuser' + Date.now());
    element(by.id('input-firstName')).sendKeys('Test');
    element(by.id('input-lastName')).sendKeys('User');
    element(by.id('input-email')).sendKeys('testuser@email.com');
    element(by.id('input-password')).sendKeys('test');
    element(by.id('input-re-password')).sendKeys('test');
    element(by.id('tocbox')).click();

    // Register test user
    element(by.css('.btn-block')).click();

    // Check that the redirect to the login screen worked
    expect(element(by.id('input-email')).isPresent()).toBeFalsy('The email field should not appear to denote the login screen');
  });
});
