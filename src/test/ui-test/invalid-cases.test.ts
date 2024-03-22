import { VSController } from './utils/vs-controller';
import { EditorView } from 'vscode-extension-tester';
import { CppCreatorExtHelper } from './utils/extension-helper';
import { ClassHelper } from './utils/class-helper';
import * as assert from "assert";
import * as fs from "fs";
import { ExtensionSettings } from './utils/extension-settings-helper';

describe('Negative-cases test suite', () => {
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
  })

  it('Clicking escape when prompt shows up, with some input', async () => {

  })

  it('Empty path in "setPath"', async () => {

  })

  it('not existant path in "setPath"', async () => {

  })

  it('Clicking escape while "setPath"-prompt is open', async () => {

  })

  it('Empty class in main-prompt', async () => {

  })

  it('Clicking Escape in main-prompt', async () => {

  })

  it('Classname > 60 chars in main-prompt', async () => {

  })

  it('Classname contains invalid characters in main-prompt', async () => {
    // e.g. ' '
  })
});