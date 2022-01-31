import * as vscode from 'vscode';

export abstract class vscode_helper
{
    public static async create_name_input() : Promise <string | undefined>
    {
    var option: vscode.InputBoxOptions = {
        ignoreFocusOut: false,
        placeHolder: "foo it in the bar.",
        prompt: "Type your class name"
    };
    return vscode.window.showInputBox(option);
    }

    public static async create_path_input() : Promise<string | undefined>
    {
    var option: vscode.InputBoxOptions = {
        ignoreFocusOut: false,
        placeHolder: "Give me your path.",
        prompt: "Type a valid path"
    };
    return await vscode.window.showInputBox(option);
    }
}