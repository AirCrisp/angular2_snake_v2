import { SnakeV2Page } from './app.po';

describe('snake-v2 App', () => {
  let page: SnakeV2Page;

  beforeEach(() => {
    page = new SnakeV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
