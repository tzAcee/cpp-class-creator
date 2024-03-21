import { InputBox, Key, VSBrowser } from "vscode-extension-tester";


export class CppCreatorExtHelper
{
    async openExtPromtByShortcut(classNamePrompt: string)
    {
        await VSBrowser.instance.driver.actions().keyDown(Key.ALT).keyUp(Key.CONTROL).keyUp(Key.SHIFT).sendKeys("x").perform();

        let inputBox = await new InputBox().wait();
        await inputBox.setText(classNamePrompt);
        await inputBox.confirm();
    }
}