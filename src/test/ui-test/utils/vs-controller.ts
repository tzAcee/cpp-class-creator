import { Workbench, TitleBar, InputBox, VSBrowser, Key, EditorView } from 'vscode-extension-tester'; 
import * as fs from "fs";
import * as assert from "assert";

export class VSController
{
    async openWorkspace(pathWs: string)
    {
       /* // check if workspace is already open
        const titleBarTitle = (await new TitleBar().getTitle());
        console.log(titleBarTitle)
        if(titleBarTitle.includes(path.dirname(pathWs)))
        {
            console.warn(`ws ${pathWs} is already open.`);
            return;
        }*/

        if(!fs.existsSync(pathWs))
        {
            fs.mkdirSync(pathWs)
        }

        const titleBar = new TitleBar();
        const item = await titleBar.getItem('File');
        const fileMenu = await item!.select();
        const openItem = await fileMenu.getItem("Add Folder to Workspace...");
        await openItem!.select();
        const input = await InputBox.create();
        await input.setText(pathWs);
        await input.confirm();
    }

    async openNewEmptyEditor()
    {
        await new Workbench().executeCommand("File: New Untitled Text File");
        //await VSBrowser.instance.driver.actions().sendKeys(Key.chord(Key.CONTROL, 'n')).perform();
        // Check if an editor with untitled document is open
        const editorView = new EditorView();
        const titles = await editorView.getOpenEditorTitles();
        const untitledEditor = titles.find((title)=>title.startsWith("Untitled-"));
        assert(untitledEditor != undefined);
        const editor = await new EditorView().openEditor(untitledEditor as string);
        await editor.wait();
    }
}