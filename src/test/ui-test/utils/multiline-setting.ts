import { By, CheckboxSetting, ComboSetting, LinkSetting, Setting, SettingsEditor, TextSetting, WebElement, Workbench } from "vscode-extension-tester";
import { locators } from "./copied-test-lib";
import assert = require("assert");
import { until } from "./util";

export async function createSetting(element: WebElement, title: string, category: string, settingsEditor: SettingsEditor): Promise<Setting> {
    console.log("Creating setting");
    await element.findElement(locators.SettingsEditor.settingConstructor(title, category));
    try {
        // try a combo setting
        await element.findElement(locators.SettingsEditor.comboSetting);
        return new ComboSetting(locators.SettingsEditor.settingConstructor(title, category), settingsEditor);
    } catch (err) {
        try {
            // try text setting
            await element.findElement(locators.SettingsEditor.textSetting);
            return new TextSetting(locators.SettingsEditor.settingConstructor(title, category), settingsEditor);
        } catch (err) {
            try {
                // try checkbox setting
                await element.findElement(locators.SettingsEditor.checkboxSetting);
                return new CheckboxSetting(locators.SettingsEditor.settingConstructor(title, category), settingsEditor);
            } catch (err) {
                // try link setting
                try {
                    await element.findElement(locators.SettingsEditor.linkButton);
                    return new LinkSetting(locators.SettingsEditor.settingConstructor(title, category), settingsEditor);
                } catch (err) {
                    // try multiline setting
                    try
                    {
                        await element.findElement(locators.SettingsEditor.textAreaSetting);
                        return new TextAreaSetting(locators.SettingsEditor.settingConstructor(title, category), settingsEditor);
                    }
                    catch(err)
                    {
                        throw new Error('Setting type not supported');
                    }
                }
            }
        }
    }
}

export async function getMultiLineSettingById(id: string): Promise<Setting>
{
    const settingsEditor = await new Workbench().openSettings();
    const invalidSetting = await settingsEditor.findSettingByID(id);
    assert(invalidSetting == undefined); // Dont expect it to be found.

    const count = await settingsEditor.findElement(By.className('settings-count-widget'));
    let textCount = await count.getText();
    await settingsEditor.getDriver().wait(async function() {
        await new Promise(res => setTimeout(res, 1500));
        const text = await count.getText();
        if (text !== textCount) {
            textCount = text;
            return false;
        }
        return true;
    });

    let setting!: Setting;
    const items = await settingsEditor.findElements(locators.SettingsEditor.itemRow);
    for (const item of items) {
        try {
            const _category = (await (await item.findElement(locators.SettingsEditor.settingCategory)).getText()).replace(':', '');
            const _title = await (await item.findElement(locators.SettingsEditor.settingLabel)).getText();
            if(id !== '') {
                const modifiedId = id.toLowerCase().replace(/\s/g, '').trim();
                const modifiedTitle = _title.toLowerCase().replace(/\s/g, '').trim();
                if(!modifiedId.endsWith(modifiedTitle)) {
                    continue;
                }
            }
            return await (await createSetting(item, _title, _category, settingsEditor)).wait();
        } catch (err) 
        {
        }
    }
    return setting;
}

export class TextAreaSetting extends Setting {

    async getValue(): Promise<string> {
        const input = await this.findElement(locators.SettingsEditor.textAreaConent);

        let textContent = "";
        await until(async ()=> {
            textContent = await input.getAttribute("textContent")
            return textContent != "";
        }, 2000);

        return textContent;
    }

    async setValue(value: string): Promise<void> {
        const input = await this.findElement(locators.SettingsEditor.textAreaSetting);
        await input.clear();
        await input.sendKeys(value);
    } 
}