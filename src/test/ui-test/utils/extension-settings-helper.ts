import * as assert from "assert";
import { EditorView, LinkSetting, Workbench, TextEditor, Setting } from "vscode-extension-tester";

export class ExtensionSettings
{
    async getSettingById(id: string): Promise<Setting>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID(id);
        assert(setting != undefined);

        return setting;
    }

    async isCreateFolderEnabled() : Promise<boolean>
    {
        const setting = await this.getSettingById("cpp.creator.createFolder");

        return (await setting.getValue() as boolean);
    }

    async setCreateFolder(val: boolean)
    {
        const setting = await this.getSettingById("cpp.creator.createFolder");

        await setting.setValue(val);
    }

    // HeaderFileContentPreset
    async getHeaderFileContentPreset() : Promise<string>
    {
        const setting = await this.getSettingById("cpp.creator.headerFileContentPreset");

        return (await setting.getValue() as string);
    }

    async setHeaderFileContentPreset(val: string)
    {
        const setting = await this.getSettingById("cpp.creator.headerFileContentPreset");

        await setting.setValue(val);
    }

    async resetHeaderFileContentPreset()
    {
        const setting = await this.getSettingById("cpp.creator.headerFileContentPreset");
    }

    // SourceFileContentPreset
    async getSourceFileContentPreset() : Promise<string>
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileContentPreset");

        return (await setting.getValue() as string);
    }

    async setSourceFileContentPreset(val: string)
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileContentPreset");

        await setting.setValue(val)
    }

    async resetSourceFileContentPreset()
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileContentPreset");
    }

    // HeaderFileNamePreset
    async getHeaderFileNamePreset() : Promise<string>
    {
        const setting = await this.getSettingById("cpp.creator.headerFileNamePreset");

        return await setting.getValue() as string;
    }

    async setHeaderFileNamePreset(val: string)
    {
        const setting = await this.getSettingById("cpp.creator.headerFileNamePreset");

        await setting.setValue(val)
    }

    async resetHeaderFileNamePreset()
    {
        const setting = await this.getSettingById("cpp.creator.headerFileNamePreset");
    }

    // SourceFileNamePreset
    async getSourceFileNamePreset() : Promise<string>
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileNamePreset");

        return await setting.getValue() as string;
    }

    async setSourceFileNamePreset(val: string)
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileNamePreset");

        await setting.setValue(val)
    }

    async resetSourceFileNamePreset()
    {
        const setting = await this.getSettingById("cpp.creator.sourceFileNamePreset");
        await setting.click();

        console.log(await setting.takeScreenshot())
    }

    // SetPath
    async isSetPath() : Promise<boolean | undefined | string>
    {
        const setting = await this.getSettingById("cpp.creator.setPath") as LinkSetting;
        await setting.openLink();

        // get editor text
        let settingsJsonEditor = await new EditorView().openEditor("settings.json") as TextEditor;
        let settingsJsonText = await settingsJsonEditor.getText();

        // parse json
        let settingsJson = JSON.parse(settingsJsonText);

        // get json value

        if(settingsJson["cpp.creator.setPath"] == "")
        {
            settingsJson["cpp.creator.setPath"] = undefined;
            await settingsJsonEditor.setText(JSON.stringify(settingsJson, null, 2));
            if(await settingsJsonEditor.isDirty())
                await settingsJsonEditor.save();
            
            return undefined;
        }

        return settingsJson["cpp.creator.setPath"] as boolean | string;
    }

    async setSetPath(val: boolean | string | undefined)
    {
        const setting = await this.getSettingById("cpp.creator.setPath") as LinkSetting;
        await setting.openLink();

        // get editor text
        let settingsJsonEditor = await new EditorView().openEditor("settings.json") as TextEditor;
        let settingsJsonText = await settingsJsonEditor.getText();

        // parse json
        let settingsJson = JSON.parse(settingsJsonText);

        // set json value
        settingsJson["cpp.creator.setPath"] = val;

        await settingsJsonEditor.setText(JSON.stringify(settingsJson, null, 2));
        if(await settingsJsonEditor.isDirty())
            await settingsJsonEditor.save();
    }
}