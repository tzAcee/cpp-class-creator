import { By } from "vscode-extension-tester";

export const locators = {
    SettingsEditor: {
        title: 'Settings',
        itemRow: By.className('monaco-list-row'),
        header: By.className('settings-header'),
        tabs: By.className('settings-tabs-widget'),
        actions: By.className('actions-container'),
        action: (label: string) => By.xpath(`.//a[@title='${label}']`),
        settingConstructor: (title: string, category: string) => By.xpath(`.//div[@class='monaco-tl-row' and .//span/text()='${title}' and .//span/text()='${category}: ']`),
        settingDesctiption: By.className('setting-item-description'),
        settingLabel: By.className('setting-item-label'),
        settingCategory: By.className('setting-item-category'),
        comboSetting: By.css('select'),
        comboOption: By.className('option-text'),
        comboValue: 'title',
        textSetting: By.css('input'),
        textAreaSetting: By.css('textarea'),
        textAreaConent: By.css('div.mirror'),
        checkboxSetting: By.className('setting-value-checkbox'),
        checkboxChecked: 'aria-checked',
        linkButton: By.className('edit-in-settings-button'),
        itemCount: By.className('settings-count-widget')
    }
}