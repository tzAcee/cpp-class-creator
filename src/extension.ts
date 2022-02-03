// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { class_creator } from './class_creator';
import { vscode_helper } from "./vscode_helper";

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

			let dir :string | undefined | boolean= vscode.workspace.getConfiguration().get("cpp.creator.setPath");
			// If it's called via the context menu, it's gonna have the fsPath set from where you're clicking
			if (args != null && args.fsPath != null) {
				dir = args.fsPath;
				if (typeof dir === "string" && fs.existsSync(dir)) {
					var stats = fs.lstatSync(dir);
					if (!stats.isDirectory()) {
						//If it's not a directory then it's the file so get the parent directory
						dir = path.dirname(args.fsPath);
					}
				}
			}
			if (dir == null || dir == false) {
				dir = vscode.workspace.rootPath as string; // use workspace path
				let createFolder: boolean | undefined = vscode.workspace.getConfiguration().get("cpp.creator.createFolder");
				if (createFolder) // create the folder where to put the class
					dir += "/" + res;
			}
			else if (dir == true)
			{
				dir = await vscode_helper.create_path_input(); // ask for path
				if (!dir)
				{
					dir = vscode.workspace.rootPath as string; // if empty input, just use workspace path
				}
			}
            var header_preset       = vscode.workspace.getConfiguration().get("cpp.creator.headerFileContentPreset")    as string;
            var source_file_preset  = vscode.workspace.getConfiguration().get("cpp.creator.sourceFileContentPreset")    as string;
            var source_file_name    = vscode.workspace.getConfiguration().get("cpp.creator.sourceFileNamePreset")       as string;
            var header_file_name    = vscode.workspace.getConfiguration().get("cpp.creator.headerFileNamePreset")       as string;

            var creator = new class_creator(res as string, header_preset, source_file_preset, dir as string, source_file_name, header_file_name)
            
			var out = creator.create_files(); // if setPath was neither false, null or true, it was a ststring, so maybe a valid path? 
																  //Create the class there
			if (out)
			{
				vscode.window.showInformationMessage('Your Class ' + res + '  has been created! \n(@'+dir+')');
			}
			else
			{
				vscode.window.showErrorMessage('Your Class ' + res + '  has been not created! \n(@'+dir+')');
			}
		});
		// Display a message box to the user

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
