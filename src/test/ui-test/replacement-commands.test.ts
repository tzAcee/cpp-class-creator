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

    let defaultHeaderFileNamePreset = "";
    let defaultSourceFileNamePreset = "";
    let defaultSourceContentPreset = "";
    let defaultHeaderContentPreset = "";
  
  before(async () => {
    await vsController.openWorkspace(workSpaceDir);

    defaultHeaderFileNamePreset = await ext_settings.getHeaderFileContentPreset();
    defaultSourceFileNamePreset = await ext_settings.getSourceFileContentPreset();
    defaultSourceContentPreset = await ext_settings.getSourceFileContentPreset();
    defaultHeaderContentPreset = await ext_settings.getHeaderFileContentPreset();

    assert (defaultHeaderContentPreset != "" && defaultHeaderFileNamePreset != "" && defaultSourceContentPreset != "" && defaultSourceFileNamePreset != "");
  });

  after(async ()=>{
    await ext_settings.setHeaderFileContentPreset(defaultHeaderContentPreset)
    await ext_settings.setSourceFileContentPreset(defaultSourceContentPreset);
    await ext_settings.setSourceFileNamePreset(defaultSourceFileNamePreset);
    await ext_settings.setHeaderFileNamePreset(defaultHeaderFileNamePreset);
  })

  beforeEach(async ()=>{
  })

  it('Test', async () => {

  })
});