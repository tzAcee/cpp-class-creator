import { VSController } from './utils/vs-controller';
import { EditorView, Key, VSBrowser } from 'vscode-extension-tester';
import { CppCreatorExtHelper } from './utils/extension-helper';
import { ClassHelper } from './utils/class-helper';
import * as assert from "assert";
import * as fs from "fs";

describe('Activation test suite', () => {
  const workSpaceDir = "/tmp/cppWs";
  let vsController = new VSController();
  let cppCreatorExt = new CppCreatorExtHelper();
  
  before(async () => {
    await vsController.openWorkspace(workSpaceDir);
  });

  after(async ()=>{
  })

  it('Extension can be activated by "Alt+X"', async () => {
    await vsController.openNewEmptyEditor();
    // Your test logic for Alt+X activation
    // Send Alt+X

    let workSpaceContent = fs.readdirSync(workSpaceDir);
    assert(workSpaceContent.length == 0);

    const className = "testClass";
    await cppCreatorExt.openExtPromtByShortcut(className);

    assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
    assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));

    // ClassHelper deletes the checked files.
    workSpaceContent = fs.readdirSync(workSpaceDir);
    assert(workSpaceContent.length == 0);

    await new EditorView().closeAllEditors();
  });

  it('Extension can be activated by the context menu', async () => {
    console.log("here");
    // Your test logic for context menu activation
  });

  it('Extension can be activated by the command pallette', async () => {
    console.log("here");
    // Your test logic for context menu activation
  });
})
