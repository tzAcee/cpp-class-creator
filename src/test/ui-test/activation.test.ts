import { assert } from 'console';
import { VSBrowser, WebDriver } from 'vscode-extension-tester';

describe('Activation test suite', () => {
  let browser: VSBrowser;
  let driver: WebDriver;
  
  before(async () => {
    browser = VSBrowser.instance;
    driver = browser.driver;
  });

  it('Extension can be activated by "Alt+X"', async () => {
    console.log("here2");
    // Your test logic for Alt+X activation
  });

  it('Extension can be activated by the context menu', async () => {
    console.log("here");
    // Your test logic for context menu activation
  });
});
