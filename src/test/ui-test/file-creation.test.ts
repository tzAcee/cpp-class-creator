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

    afterEach(async ()=>{
        await ext_settings.setSetPath(undefined);
        await ext_settings.setCreateFolder(false);
    });

     it("Don't create new folder if 'Create Folder' is false", async ()=>{
        assert(await ext_settings.isCreateFolderEnabled() == false)
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    });

    it("Create new folder if 'Create Folder' is true", async ()=>{
        assert(await ext_settings.isCreateFolderEnabled() == false)

        await ext_settings.setCreateFolder(true);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));

        const folderPath = workSpaceDir+"/"+className;
        // Check for empty folder
        const readDirContent = fs.readdirSync(folderPath);
        assert(readDirContent.length == 0);

        fs.rmdirSync(folderPath);
    });    

    it("Prompt for the path if 'SetPath' is true", async ()=>
    {
        assert(await ext_settings.isSetPath() == undefined)

        let newPath = "/tmp/newWsPath";

        await ext_settings.setSetPath(true);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptWithPathPromptByCmdPallette(className, newPath);
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    
        // ClassHelper deletes the checked files.
        let newWorkSpaceContent = fs.readdirSync(newPath);
        assert(newWorkSpaceContent.length == 0);     
    });

    it("Don't prompt for the path if 'SetPath' is false", async ()=>
    {
        await ext_settings.setSetPath(false);

        assert(await ext_settings.isCreateFolderEnabled() == false)
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    });

    it("Don't prompt for the path if 'SetPath' is undefined", async ()=>{
        await ext_settings.setSetPath(undefined);

        assert(await ext_settings.isCreateFolderEnabled() == false)
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, workSpaceDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    });

    it("Don't prompt for the path if 'SetPath' is a string with the wished path", async ()=>{
        let newPath = "/tmp/newWsPath";

        await ext_settings.setSetPath(newPath);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    
        // ClassHelper deletes the checked files.
        let newWorkSpaceContent = fs.readdirSync(newPath);
        assert(newWorkSpaceContent.length == 0);   
    }); 

    it("'SetPath' is overriden by context-menu location", async()=>{
        await ext_settings.setSetPath(true)
        assert(await ext_settings.isSetPath() == true)

        const className = "testClass";
        const expDir = workSpaceDir + "/child";
        await cppCreatorExt.openExtPromptByContextMenuWithChild(className, workSpaceDir, "child");
        assert(await ClassHelper.fileExistsWithContent(className, expDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, expDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));

        let newWorkSpaceContent = fs.readdirSync(expDir);
        assert(newWorkSpaceContent.length == 0);   
    });

    it("Combine 'createFolder' with 'setPath' ('createFolder' ignored)", async()=>{
        await ext_settings.setCreateFolder(true)

        let newPath = "/tmp/newWsPath";

        await ext_settings.setSetPath(newPath);
    
        const className = "testClass";
    
        await cppCreatorExt.openExtPromptByCmdPallette(className);
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, newPath+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
    
        // ClassHelper deletes the checked files.
        let newWorkSpaceContent = fs.readdirSync(newPath);
        assert(newWorkSpaceContent.length == 0);   

    });

    it("Combine 'createFolder' with context-menu location ('createFolder' ignored)", async ()=>{
        await ext_settings.setCreateFolder(true)

        const className = "testClass";
        const expDir = workSpaceDir + "/child";
        await cppCreatorExt.openExtPromptByContextMenuWithChild(className, workSpaceDir, "child");
        assert(await ClassHelper.fileExistsWithContent(className, expDir+"/"+className+".h", ClassHelper.defaultHeaderContent(className), true));
        assert(await ClassHelper.fileExistsWithContent(className, expDir+"/"+className+".cpp", ClassHelper.defaultClassContent(className), true));
        
        let newWorkSpaceContent = fs.readdirSync(expDir);
        assert(newWorkSpaceContent.length == 0);   
    });
});