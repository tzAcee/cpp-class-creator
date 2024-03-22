import { VSController } from './utils/vs-controller';
import { EditorView } from 'vscode-extension-tester';
import { CppCreatorExtHelper } from './utils/extension-helper';
import { ClassHelper } from './utils/class-helper';
import * as assert from "assert";
import * as fs from "fs";
import { ExtensionSettings } from './utils/extension-settings-helper';

describe('Text teplacement test suite', () => {
    const workSpaceDir = "/tmp/cppWs";
    let vsController = new VSController();
    let cppCreatorExt = new CppCreatorExtHelper();
    let ext_settings = new ExtensionSettings();
  
  before(async () => {
    await vsController.openWorkspace(workSpaceDir);
  });

  after(async ()=>{
  })

  beforeEach(async ()=>{
    await ext_settings.resetSourceFileNamePreset();
  })

  it('Test', async () => {

  })
});