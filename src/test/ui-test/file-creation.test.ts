import { CppCreatorExtHelper } from "./utils/extension-helper";
import { VSController } from "./utils/vs-controller";
import { ExtensionSettings } from "./utils/extension-settings-helper";
import * as assert from "assert";
import * as fs from "fs";
import { ClassHelper } from "./utils/class-helper";

describe('Creation test suite', () => {
    const workSpaceDir = "/tmp/cppWs";
    let vsController = new VSController();
    let cppCreatorExt = new CppCreatorExtHelper();
    let ext_settings = new ExtensionSettings();
    
    before(async () => {
      await vsController.openWorkspace(workSpaceDir);
    });
  
    after(async ()=>{
    })

    it("Don't create new folder if 'Create Folder' is false", async ()=>{
        assert(await ext_settings.isCreateFolderEnabled() == false)
        let workSpaceContent = fs.readdirSync(workSpaceDir);
        assert(workSpaceContent.length == 0);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    
        // ClassHelper deletes the checked files.
        workSpaceContent = fs.readdirSync(workSpaceDir);
        assert(workSpaceContent.length == 0);
    });

    it("Create new folder if 'Create Folder' is true", async ()=>{
        assert(await ext_settings.isCreateFolderEnabled() == false)

        await ext_settings.setCreateFolder(true);

        let workSpaceContent = fs.readdirSync(workSpaceDir);
        assert(workSpaceContent.length == 0);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(workSpaceDir+"/"+className+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    
        // ClassHelper deletes the checked files, aonly folder is there.
        workSpaceContent = fs.readdirSync(workSpaceDir);
        assert(workSpaceContent.length == 1);

        const folderPath = workSpaceDir+"/"+className;
        // Check for empty folder
        const readDirContent = fs.readdirSync(folderPath);
        assert(readDirContent.length == 0);

        fs.rmdirSync(folderPath);
        workSpaceContent = fs.readdirSync(workSpaceDir);
        assert(workSpaceContent.length == 0);
    });    

    it("Prompt for the path if 'SetPath' is true", async ()=>{

    });

    it("Don't prompt for the path if 'SetPath' is false", async ()=>{

    });

    it("Don't prompt for the path if 'SetPath' is undefined", async ()=>{

    });

    it("Don't prompt for the path if 'SetPath' is a string with the wished path", async ()=>{

    });

    it("'SetPath' is overriden by context-menu location", async()=>{

    });

    it("Combine 'createFolder' with 'setPath'", ()=>{});

    it("Combine 'createFolder' with context-menu location", ()=>{});
});