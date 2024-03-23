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

      await ext_settings.setHeaderFileContentPreset("{{*HEADERFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - SOURCEFILENAME once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*SOURCEFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName.replace(".h", ".cpp");

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - CLASSNAMEUPPER once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CLASSNAMEUPPER*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className.toUpperCase();

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - CLASSNAMELOWER once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CLASSNAMELOWER*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className.toLowerCase();

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - CLASSNAMECAPI once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CLASSNAMECAPI*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className[0].toUpperCase() + className.substring(1);

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - CLASSNAME once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CLASSNAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[header file content] - CURRENTDATETIME once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CURRENTDATETIME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentDateTimeString = new Date().toLocaleString();

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);

      try
      {
        assert(content == currentDateTimeString);
      } catch(e)
      {
        const diff = Math.abs(new Date(content).getTime() - new Date(currentDateTimeString).getTime()); 
        console.log("time diff", diff);
        assert(diff < 1000);
      }

    })

    it('[header file content] - CURRENTDATE once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CURRENTDATE*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentDateString = new Date().toLocaleDateString();

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);

      assert(content == currentDateString);
    })

    it('[header file content] - CURRENTTIME once', async () => {
      await ext_settings.setHeaderFileContentPreset("{{*CURRENTTIME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentTimeString = new Date().toLocaleTimeString();

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);

      const trimmedContent = content.trim().replace(/\u{2007}/gu, ' ').replace(/\u{202F}/gu, ' ');
      const trimmedCurrentTimeString = currentTimeString.trim().replace(/\u{2007}/gu, ' ').replace(/\u{202F}/gu, ' ');

      assert(trimmedContent == trimmedCurrentTimeString);
    })

    it('[header file content] - combination', async () => {
      
      await ext_settings.setHeaderFileContentPreset("{{*CLASSNAMECAPI*}}-{{*CLASSNAME*}}-{{*HEADERFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".h";
      const path = workSpaceDir + "/" + fileName;
      const capitalized = className[0].toUpperCase() + className.substring(1);
      const expectedContent = capitalized + "-"+className+"-"+fileName;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    // source file content tests:
    it('[source file content] - HEADERFILENAME multiple', async () => {
      await ext_settings.setSourceFileContentPreset("{{*HEADERFILENAME*}}-{{*HEADERFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName.replace(".cpp", ".h")+"-"+fileName.replace(".cpp", ".h");

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - HEADERFILENAME once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*HEADERFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName.replace(".cpp", ".h");

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - SOURCEFILENAME once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*SOURCEFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = fileName;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - CLASSNAMEUPPER once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CLASSNAMEUPPER*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className.toUpperCase();

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - CLASSNAMELOWER once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CLASSNAMELOWER*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className.toLowerCase();

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - CLASSNAMECAPI once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CLASSNAMECAPI*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className[0].toUpperCase() + className.substring(1);

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - CLASSNAME once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CLASSNAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const expectedContent = className;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false));
    })

    it('[source file content] - CURRENTDATETIME once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CURRENTDATETIME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentDateTimeString = new Date().toLocaleString();

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);

      try
      {
        assert(content == currentDateTimeString);
      } catch(e)
      {
        assert(Math.abs(new Date(content).getTime() - new Date(currentDateTimeString).getTime()) < 10);
      }

    })

    it('[source file content] - CURRENTDATE once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CURRENTDATE*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentDateString = new Date().toLocaleDateString();

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);

      assert(content == currentDateString);
    })

    it('[source file content] - CURRENTTIME once', async () => {
      await ext_settings.setSourceFileContentPreset("{{*CURRENTTIME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentTimeString = new Date().toLocaleTimeString();

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;

      const content = await ClassHelper.fileExistsGetContent(path, className);
      const trimmedContent = content.trim().replace(/\u{2007}/gu, ' ').replace(/\u{202F}/gu, ' ');
      const trimmedCurrentTimeString = currentTimeString.trim().replace(/\u{2007}/gu, ' ').replace(/\u{202F}/gu, ' ');

      assert(trimmedContent == trimmedCurrentTimeString);
    })

    it('[source file content] - combination', async () => {
      
      await ext_settings.setSourceFileContentPreset("{{*CLASSNAMECAPI*}}-{{*CLASSNAME*}}-{{*SOURCEFILENAME*}}");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const fileName = className + ".cpp";
      const path = workSpaceDir + "/" + fileName;
      const capitalized = className[0].toUpperCase() + className.substring(1);
      const expectedContent = capitalized + "-"+className+"-"+fileName;

      assert(await ClassHelper.fileExistsWithContent(className, path, expectedContent, false))
    })
});