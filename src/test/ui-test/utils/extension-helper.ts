
import { ActivityBar, InputBox, Key, VSBrowser, Workbench } from "vscode-extension-tester";

import * as path from "path";
import * as assert from "assert";

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
    
    async openExtPromptByCmdPallette(classNamePrompt: string)
    {
        await new Workbench().executeCommand("Create C++ Class");

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();
    }
}