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
    await ext_settings.setSetPath(undefined);
    await ext_settings.setCreateFolder(false);
  })

  beforeEach(async ()=>{
  })

  it('Clicking escape when prompt shows up, with some input', async () => {
    await cppCreatorExt.openPromptSendESC("test");
    assert(await VSController.isNotificationSent("Your class could NOT be created!"));
    assert(!fs.existsSync(workSpaceDir+"/test.cpp"))
    assert(!fs.existsSync(workSpaceDir+"/test.h"))
  })

  it('Empty class in main-prompt', async () => {
    await cppCreatorExt.openExtPromptByContextMenu("", workSpaceDir);

    assert(await VSController.isNotificationSent("Your class could NOT be created!"));
    assert(!fs.existsSync(workSpaceDir+"/.cpp"))
    assert(!fs.existsSync(workSpaceDir+"/.h"))
  })

  it('Classname > 60 chars in main-prompt', async () => {
    await cppCreatorExt.openExtPromptByCmdPallette("abcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjz");
    
    assert(await VSController.isNotificationSent("Class name to long!"));
    assert(!fs.existsSync(workSpaceDir+"/abcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjz.cpp"))
    assert(!fs.existsSync(workSpaceDir+"/abcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjzabcdefghijklmnopqrstuvwxyjz.h"))
  })

  it('Classname contains invalid characters in main-prompt', async () => {
    // e.g. ' '
    await cppCreatorExt.openExtPromptByCmdPallette("a b c");
    
    assert(await VSController.isNotificationSent("Class name should not have spaces!"));
    assert(!fs.existsSync(workSpaceDir+"/a b c.cpp"))
    assert(!fs.existsSync(workSpaceDir+"/a b c.h"))
  })

  it('Empty path in "setPath"', async () => {
    await ext_settings.setSetPath(true);
    await cppCreatorExt.openExtPromptWithPathPromptByCmdPallette("test", "");

    // files just create without setPath
    assert(await ClassHelper.fileExistsWithContent("test", workSpaceDir+"/test.h", ClassHelper.defaultHeaderContent("test"), true));
    assert(await ClassHelper.fileExistsWithContent("test", workSpaceDir+"/test.cpp", ClassHelper.defaultClassContent("test"), true));
    await ext_settings.setSetPath(false);
  })
});