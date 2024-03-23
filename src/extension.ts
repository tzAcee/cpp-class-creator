// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { class_creator } from './class_creator';
import { vscode_helper } from "./vscode_helper";
import { dir_helper } from "./dir_helper";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-class-creator" is now active!');

	let disposable = vscode.commands.registerCommand('extension.createClass', async (args) => {
		// The code you place here will be executed every time your command is executed

		var res = await vscode_helper.create_name_input();
			if(!vscode_helper.can_continue(res)) return; // check for class name

			let dir_config :string | undefined | boolean= vscode.workspace.getConfiguration().get("cpp.creator.setPath");
			let dir_h = new dir_helper(dir_config, args);

			await dir_h.check_context_menu();
			await dir_h.check_boolean_null(res);

            var header_preset       = vscode.workspace.getConfiguration().get("cpp.creator.headerFileContentPreset")    as string;
            var source_file_preset  = vscode.workspace.getConfiguration().get("cpp.creator.sourceFileContentPreset")    as string;
            var source_file_name    = vscode.workspace.getConfiguration().get("cpp.creator.sourceFileNamePreset")       as string;
            var header_file_name    = vscode.workspace.getConfiguration().get("cpp.creator.headerFileNamePreset")       as string;

            var creator = new class_creator(res as string, header_preset, source_file_preset, dir_h.dir(), source_file_name, header_file_name)
            
			var out = creator.create_files(); // if setPath was neither false, null or true, it was a ststring, so maybe a valid path? 
																  //Create the class there
			if (out)
			{
				vscode.window.showInformationMessage('Your class "' + res + '"  has been created! \n(@'+dir_h.dir()+')');
			}
			else
			{
				vscode.window.showErrorMessage('Your class "' + res + '"  has NOT been created! \n(@'+dir_h.dir()+')');
			}
		});
		// Display a message box to the user

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
