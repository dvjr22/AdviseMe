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

describe('Cart System', () => {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get('/');
    login('student', '1234');
  });

  it('should submit a cart', () => {
    browser.get('/pages/student/cart');
    element(by.id('submitBtn')).click();
    browser.sleep(2000);
    expect(element(by.id('requeststatus')).isPresent()).toBeTruthy('Should be at the request status');
    logout();
    login('advisor', '1234');
    browser.get('/pages/advisor/requests');
    element(by.id('requestClassButton')).click();
    element(by.id('basic-url')).click().then(() => {
      element(by.id('basic-url')).sendKeys('Testing Change');
    });
    element(by.id('requestedChangeButton')).click();
    browser.sleep(2000);
    expect(element(by.id('noRequests')).isPresent()).toBeTruthy('No student requests displayed');
  });
});




function login(username: string, password: string) {
  element(by.id('input-username')).sendKeys(username);
  element(by.id('input-password')).sendKeys(password);
  element(by.css('.btn-block')).click();
}

function logout() {
  browser.get('/auth/login');
}
