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

    defaultHeaderFileNamePreset = await ext_settings.getHeaderFileNamePreset();
    defaultSourceFileNamePreset = await ext_settings.getSourceFileNamePreset();
    defaultSourceContentPreset = await ext_settings.getSourceFileContentPreset();
    defaultHeaderContentPreset = await ext_settings.getHeaderFileContentPreset();
    assert (defaultHeaderContentPreset != "" && defaultHeaderFileNamePreset != "" && defaultSourceContentPreset != "" && defaultSourceFileNamePreset != "");

    await ext_settings.setSourceFileContentPreset("test");
  });

  after(async ()=>{
    await ext_settings.setHeaderFileContentPreset(defaultHeaderContentPreset)
    await ext_settings.setSourceFileContentPreset(defaultSourceContentPreset);
    await ext_settings.setSourceFileNamePreset(defaultSourceFileNamePreset);
    await ext_settings.setHeaderFileNamePreset(defaultHeaderFileNamePreset);
  })

  beforeEach(async ()=>{
  })

    // header file name tests:
    it('[header file name] - CLASSNAMEUPPER multiple', async () => {

    })

    it('[header file name] - CLASSNAMEUPPER once', async () => {

    })

    it('[header file name] - CLASSNAMECAPI once', async () => {

    })

    it('[header file name] - CLASSNAME once', async () => {

    })

    it('[header file name] - CURRENTDATETIME once', async () => {

    })

    it('[header file name] - CURRENTDATE once', async () => {

    })

    it('[header file name] - CURRENTTIME once', async () => {

    })

    it('[header file name] - combination', async () => {

    })

    // source file name tests:
    it('[source file name] - CLASSNAMEUPPER multiple', async () => {

    })

    it('[source file name] - CLASSNAMEUPPER once', async () => {

    })

    it('[source file name] - CLASSNAMECAPI once', async () => {

    })

    it('[source file name] - CLASSNAME once', async () => {

    })

    it('[source file name] - CURRENTDATETIME once', async () => {

    })

    it('[source file name] - CURRENTDATE once', async () => {

    })

    it('[source file name] - CURRENTTIME once', async () => {

    })

    it('[source file name] - combination', async () => {

    })

    // header file content tests:
    it('[header file content] - HEADERFILENAME multiple', async () => {

    })

    it('[header file content] - HEADERFILENAME once', async () => {

    })

    it('[header file content] - SOURCEFILENAME once', async () => {

    })

    it('[header file content] - CLASSNAMEUPPER once', async () => {

    })

    it('[header file content] - CLASSNAMELOWER once', async () => {

    })

    it('[header file content] - CLASSNAMECAPI once', async () => {

    })

    it('[header file content] - CLASSNAME once', async () => {

    })

    it('[header file content] - CURRENTDATETIME once', async () => {

    })

    it('[header file content] - CURRENTDATE once', async () => {

    })

    it('[header file content] - CURRENTTIME once', async () => {

    })

    it('[header file content] - combination', async () => {

    })

    // source file content tests:
    it('[source file content] - HEADERFILENAME multiple', async () => {

    })

    it('[source file content] - HEADERFILENAME once', async () => {

    })

    it('[source file content] - SOURCEFILENAME once', async () => {

    })

    it('[source file content] - CLASSNAMEUPPER once', async () => {

    })

    it('[source file content] - CLASSNAMELOWER once', async () => {

    })

    it('[source file content] - CLASSNAMECAPI once', async () => {

    })

    it('[source file content] - CLASSNAME once', async () => {

    })

    it('[source file content] - CURRENTDATETIME once', async () => {

    })

    it('[source file content] - CURRENTDATE once', async () => {

    })

    it('[source file content] - CURRENTTIME once', async () => {

    })

    it('[source file content] - combination', async () => {

    })
});