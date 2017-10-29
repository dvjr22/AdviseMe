import { AppPage } from './app.po';

describe('adviseme-webapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('/');
    expect(page.getParagraphText()).toEqual('Please sign in');
  });

  it('should register a new user', () => {
    page.navigateTo('/registration');
    page.register('Test User', 'testuser', 'testuser');
  });

  it('should login', () => {
    page.navigateTo('/');
    page.login('testuser', 'testuser');
  });
});
