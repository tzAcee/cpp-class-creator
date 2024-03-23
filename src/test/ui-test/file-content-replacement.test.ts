import { VSController } from './utils/vs-controller';
import { CppCreatorExtHelper } from './utils/extension-helper';
import { ClassHelper } from './utils/class-helper';
import * as assert from "assert";
import * as fs from "fs";
import { ExtensionSettings } from './utils/extension-settings-helper';

describe('File-content replacement test suite', () => {
    const workSpaceDir = "/tmp/cppWs";
    let vsController = new VSController();
    let cppCreatorExt = new CppCreatorExtHelper();
    let ext_settings = new ExtensionSettings();

    let defaultSourceContentPreset = "";
    let defaultHeaderContentPreset = "";
  
  before(async () => {
    await vsController.openWorkspace(workSpaceDir);

    defaultSourceContentPreset = await ext_settings.getSourceFileContentPreset();
    defaultHeaderContentPreset = await ext_settings.getHeaderFileContentPreset();
    assert (defaultHeaderContentPreset != "" && defaultSourceContentPreset != "");
  });

  after(async ()=>{
    await ext_settings.setHeaderFileContentPreset(defaultHeaderContentPreset)
    await ext_settings.setSourceFileContentPreset(defaultSourceContentPreset);
  })

  afterEach(async ()=>{
    // just delete the directory
    let dirContents = fs.readdirSync(workSpaceDir);
    for(let contentPath of dirContents)
    {
        try
        {
          fs.unlinkSync(workSpaceDir+"/"+contentPath);
        } catch(e)
        {
        }

    }

  })

  beforeEach(async ()=>{
  })

    // header file content tests:
    it('[header file content] - HEADERFILENAME multiple', async () => {

      await ext_settings.setHeaderFileContentPreset("{{*HEADERFILENAME*}}-{{*HEADERFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName+"-"+fileName;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
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