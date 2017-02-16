import { TeslaPage } from './app.po';

describe('tesla App', function() {
  let page: TeslaPage;

  beforeEach(() => {
    page = new TeslaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
