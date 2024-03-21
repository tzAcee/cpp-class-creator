import * as assert from "assert";
import { Workbench } from "vscode-extension-tester";

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
        const setting = await settingsEditor.findSettingByID("cpp.creator.setPath");
        assert(setting != undefined);
        return await setting.getValue() as boolean | undefined | string;
    }

    async setSetPath(val: boolean | string)
    {
        const settingsEditor = await new Workbench().openSettings();
        const setting = await settingsEditor.findSettingByID("cpp.creator.setPath");
        assert(setting != undefined);
        await setting.setValue(val);
    }
}