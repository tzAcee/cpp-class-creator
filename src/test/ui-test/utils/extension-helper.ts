
import { ActivityBar, InputBox, Key, TreeItem, VSBrowser, Workbench } from "vscode-extension-tester";

import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import { until } from "./util";

export class CppCreatorExtHelper
{
    async openExtPromptByShortcut(classNamePrompt: string)
    {
        // heavy workaround
        await VSBrowser.instance.driver.actions().keyDown(Key.ALT).keyUp(Key.CONTROL).keyUp(Key.SHIFT).sendKeys("x").perform();

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();

        // fix workaround
        await VSBrowser.instance.driver.actions().keyDown(Key.CONTROL).keyDown(Key.SHIFT).keyUp(Key.ALT).perform();
    }

    async openExtPromptByContextMenu(classNamePrompt: string, wsPath: string)
    {
        const explorer = await new ActivityBar().getViewControl("Explorer");
        assert(explorer != undefined);
        const explorerView = await explorer.openView();

        const explorerContent = explorerView.getContent();

        const wsExplorer = await explorerContent.getSection("Untitled (Workspace)");
        await wsExplorer.expand();

        const wsName = path.basename(wsPath);
        let clickableItem = await wsExplorer.findItem(wsName);
        assert(clickableItem != undefined);

        const explorerMenu = await clickableItem.openContextMenu();
        const createElem = await explorerMenu.getItem("Create C++ Class");
        assert(createElem != undefined);
        
        await createElem.click();

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();
    }

    async openExtPromptByContextMenuWithChild(classNamePrompt: string, wsPath: string, child: string)
    {
        // create child-entry first
        const childPath = wsPath+"/"+child; 
        if(!fs.existsSync(childPath))
        {
            fs.mkdirSync(childPath);
            
        }


        const explorer = await new ActivityBar().getViewControl("Explorer");
        assert(explorer != undefined);
        const explorerView = await explorer.openView();
        const explorerContent = explorerView.getContent();
        const wsExplorer = await explorerContent.getSection("Untitled (Workspace)");


        await wsExplorer.expand();
        assert(fs.existsSync(childPath))
        await wsExplorer.click();
        const refreshAction =  await wsExplorer.getAction("Refresh Explorer");
        assert(refreshAction != undefined);
        await refreshAction.click();

        const wsName = path.basename(wsPath);
        let clickableItem = await wsExplorer.findItem(wsName) as TreeItem;
        assert(clickableItem != undefined);
        await clickableItem.expand()

        let clickableChildItem: TreeItem | undefined = undefined;
        await until(async ()=>{
            try
            {
                const childItem = await clickableItem.findChildItem(path.basename(childPath));
                assert(childItem != undefined);
                clickableChildItem = childItem;
                return true;
            }
            catch(e)
            {
                return false;
            }

        }, 2000);

        assert(clickableChildItem != undefined);
        const explorerMenu = await (clickableChildItem as TreeItem).openContextMenu();
        const createElem = await explorerMenu.getItem("Create C++ Class");
        assert(createElem != undefined);
        await createElem.click();

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();
    }
    
    async openExtPromptByCmdPallette(classNamePrompt: string)
    {
        await new Workbench().executeCommand("Create C++ Class");

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();
    }

    async openExtPromptWithPathPromptByCmdPallette(classNamePrompt: string, path: string)
    {
        await new Workbench().executeCommand("Create C++ Class");

        {
            let inputBox = await new InputBox().wait();
            await inputBox.setText(classNamePrompt);
            await inputBox.confirm();
        }

        {
            let inputBox = await new InputBox().wait();
            await inputBox.setText(path);
            await inputBox.confirm();
        }

    }

    async openPromptSendESC(classNamePrompt: string)
    {
        await new Workbench().executeCommand("Create C++ Class");

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await VSBrowser.instance.driver.actions().sendKeys(Key.ESCAPE).perform();
    }

    async openPromptSendESCToPath(classNamePrompt: string, pathPrompt: string)
    {
        await new Workbench().executeCommand("Create C++ Class");

        {
            let inputBox = await new InputBox().wait();
            await inputBox.setText(classNamePrompt);
            await inputBox.submit();
        }
            await VSBrowser.instance.driver.sleep(1000);
        {
            let inputBox = await new InputBox().wait();
            await inputBox.setText(pathPrompt);
            await VSBrowser.instance.driver.actions().sendKeys(Key.ESCAPE).perform();
        }
    }
}