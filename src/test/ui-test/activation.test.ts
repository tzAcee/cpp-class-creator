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

    const className = "testClass";
    await cppCreatorExt.openExtPromptByShortcut(className);

    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));

    await new EditorView().closeAllEditors();
  })

  it('Extension can be activated by the context menu', async () => {
    // test logic for context menu activ.

    const className = "testClass";
    await cppCreatorExt.openExtPromptByContextMenu(className, workSpaceDir);

    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
  })

  it('Extension can be activated by the command pallette', async () => {
    const className = "testClass";

    await cppCreatorExt.openExtPromptByCmdPallette(className);
    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
    assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
  });
})
