import * as assert from "assert";
import { VSBrowser, WebDriver } from 'vscode-extension-tester';

describe('Init test suite', () => {
  let browser: VSBrowser;
  let driver: WebDriver
  
  before(async () => {
    browser = VSBrowser.instance;
    driver = browser.driver;
  });
  
  it('title not empty', async () => {
    const title = await driver.getTitle();
    assert(title != "");
  });
})