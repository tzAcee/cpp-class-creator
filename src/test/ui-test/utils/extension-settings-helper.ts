import * as assert from "assert";
import { EditorView, LinkSetting, Workbench, TextEditor } from "vscode-extension-tester";

export class ExtensionSettings
{
    async isCreateFolderEnabled() : Promise<boolean>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.createFolder");
        assert(setting != undefined);
        return (await setting.getValue() as boolean);
    }

    async setCreateFolder(val: boolean)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.createFolder");
        assert(setting != undefined);
        await setting.setValue(val);
    }

    // HeaderFileContentPreset
    async getHeaderFileContentPreset() : Promise<string>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.headerFileContentPreset");
        assert(setting != undefined);
        return (await setting.getValue() as string);
    }

    async setHeaderFileContentPreset(val: string)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.headerFileContentPreset");
        assert(setting != undefined);
        await setting.setValue(val);
    }

    // SourceFileContentPreset
    async getSourceFileContentPreset() : Promise<string>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.sourceFileContentPreset");
        assert(setting != undefined);
        return (await setting.getValue() as string);
    }

    async setSourceFileContentPreset(val: string)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.sourceFileContentPreset");
        assert(setting != undefined);
        await setting.setValue(val)
    }

    // HeaderFileNamePreset
    async getHeaderFileNamePreset() : Promise<string>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.headerFileNamePreset");
        assert(setting != undefined);
        return await setting.getValue() as string;
    }

    async setHeaderFileNamePreset(val: string)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.headerFileNamePreset");
        assert(setting != undefined);
        await setting.setValue(val)
    }

    // SourceFileNamePreset
    async getSourceFileNamePreset() : Promise<string>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.sourceFileNamePreset");
        assert(setting != undefined);
        return await setting.getValue() as string;
    }

    async setSourceFileNamePreset(val: string)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.sourceFileNamePreset");
        assert(setting != undefined);
        await setting.setValue(val)
    }

    // SetPath
    async isSetPath() : Promise<boolean | undefined | string>
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.setPath") as LinkSetting;
        assert(setting != undefined);
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
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.setPath") as LinkSetting;
        assert(setting != undefined);
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