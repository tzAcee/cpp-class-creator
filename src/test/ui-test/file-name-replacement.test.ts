import { VSController } from './utils/vs-controller';
import { CppCreatorExtHelper } from './utils/extension-helper';
import { ClassHelper } from './utils/class-helper';
import * as assert from "assert";
import * as fs from "fs";
import { ExtensionSettings } from './utils/extension-settings-helper';

describe('File-name replacement test suite', () => {
    const workSpaceDir = "/tmp/cppWs";
    let vsController = new VSController();
    let cppCreatorExt = new CppCreatorExtHelper();
    let ext_settings = new ExtensionSettings();

    let defaultHeaderFileNamePreset = "";
    let defaultSourceFileNamePreset = "";
  
  before(async () => {
    await vsController.openWorkspace(workSpaceDir);

    defaultHeaderFileNamePreset = await ext_settings.getHeaderFileNamePreset();
    defaultSourceFileNamePreset = await ext_settings.getSourceFileNamePreset();
    assert (defaultHeaderFileNamePreset != "" && defaultSourceFileNamePreset != "");
  });

  after(async ()=>{
    await ext_settings.setSourceFileNamePreset(defaultSourceFileNamePreset);
    await ext_settings.setHeaderFileNamePreset(defaultHeaderFileNamePreset);
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

    // header file name tests:
    it('[header file name] - CLASSNAMEUPPER multiple', async () => {

      await ext_settings.setHeaderFileNamePreset("{{*CLASSNAMEUPPER*}}-{{*CLASSNAMEUPPER*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toUpperCase()+"-"+ className.toUpperCase() + ".h";
      assert(await ClassHelper.fileExists(path));
    })

    it('[header file name] - CLASSNAMEUPPER once', async () => {
      await ext_settings.setHeaderFileNamePreset("{{*CLASSNAMEUPPER*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toUpperCase() + ".h";
      assert(await ClassHelper.fileExists(path));
    })

    it('[header file name] - CLASSNAMELOWER once', async () => {
      await ext_settings.setHeaderFileNamePreset("{{*CLASSNAMELOWER*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toLowerCase() + ".h";
      assert(await ClassHelper.fileExists(path));
    })

    it('[header file name] - CLASSNAMECAPI once', async () => {
      await ext_settings.setHeaderFileNamePreset("{{*CLASSNAMECAPI*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const capitalized = className[0].toUpperCase() + className.substring(1);

      const path = workSpaceDir + "/" + capitalized + ".h";
      assert(await ClassHelper.fileExists(path));
    })

    it('[header file name] - CLASSNAME once', async () => {
      await ext_settings.setHeaderFileNamePreset("{{*CLASSNAME*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className + ".h";
      assert(await ClassHelper.fileExists(path));
    })

 /*   it('[header file name] - CURRENTDATETIME once', async () => {
      await ext_settings.setHeaderFileNamePreset("{{*CURRENTDATETIME*}}.h");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const currentDateTimeString = new Date().toLocaleString();
      const headerPaths = await waitUntilFileWithEndingCreated(".h", workSpaceDir);
      assert(headerPaths.length == 1);

      let createdDateTime = headerPaths[0].replace(".h", "");

      console.log(currentDateTimeString);
      console.log(createdDateTime);
    })

    it('[header file name] - CURRENTDATE once', async () => {

    })

    it('[header file name] - CURRENTTIME once', async () => {

    })*/

    it('[header file name] - combination', async () => {
        await ext_settings.setHeaderFileNamePreset("{{*CLASSNAMECAPI*}}-{{*CLASSNAME*}}-{{*CLASSNAMEUPPER*}}.h");
        const className = "sImple";
  
        await cppCreatorExt.openExtPromptByCmdPallette(className);
  
        const capitalized = className[0].toUpperCase() + className.substring(1);
  
        const path = workSpaceDir + "/" + capitalized +"-"+className+"-"+ className.toUpperCase()+ ".h";
        assert(await ClassHelper.fileExists(path));
    })

    // source file name tests:
    it('[source file name] - CLASSNAMEUPPER multiple', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAMEUPPER*}}-{{*CLASSNAMEUPPER*}}.cpp");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toUpperCase()+"-"+ className.toUpperCase() + ".cpp";
      assert(await ClassHelper.fileExists(path));
    })

    it('[source file name] - CLASSNAMEUPPER once', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAMEUPPER*}}.cpp");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toUpperCase() + ".cpp";
      assert(await ClassHelper.fileExists(path));
    })

    it('[source file name] - CLASSNAMECAPI once', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAMECAPI*}}.cpp");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const capitalized = className[0].toUpperCase() + className.substring(1);

      const path = workSpaceDir + "/" + capitalized + ".cpp";
      assert(await ClassHelper.fileExists(path));
    })

    it('[source file name] - CLASSNAME once', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAME*}}.cpp");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className + ".cpp";
      assert(await ClassHelper.fileExists(path));
    })

    it('[source file name] - CLASSNAMELOWER once', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAMELOWER*}}.cpp");
      const className = "testClass";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const path = workSpaceDir + "/" + className.toLowerCase() + ".cpp";
      assert(await ClassHelper.fileExists(path));
    })

    it('[source file name] - combination', async () => {
      await ext_settings.setSourceFileNamePreset("{{*CLASSNAMECAPI*}}-{{*CLASSNAME*}}-{{*CLASSNAMEUPPER*}}.cpp");
      const className = "sImple";

      await cppCreatorExt.openExtPromptByCmdPallette(className);

      const capitalized = className[0].toUpperCase() + className.substring(1);

      const path = workSpaceDir + "/" + capitalized +"-"+className+"-"+ className.toUpperCase()+ ".cpp";
      assert(await ClassHelper.fileExists(path));
    })
});