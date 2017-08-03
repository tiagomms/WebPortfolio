import { MyPortfolioPage } from './app.po';

describe('my-portfolio App', () => {
  let page: MyPortfolioPage;

  beforeEach(() => {
    page = new MyPortfolioPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
