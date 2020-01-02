// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';


function create_input()
{
	var option: vscode.InputBoxOptions = {
		ignoreFocusOut:false,
		placeHolder: "foo it in the bar.",
		prompt: "Type your class name"
	}
	return vscode.window.showInputBox(option);
}

function create_hpp(name: string, dir: string)
{
	var hpp_buffer =
`class ` + name +`  
{
	private:

	public:

		`+ name +`();
		~`+name+`();

};`;
	var hpp_name = dir+"/"+name + '.hpp';
	fs.writeFile(hpp_name, hpp_buffer, function (err)
	{
		if (err) {
			console.error(err);
			return false;
		}
	});


	return true;
}

function create_cpp(name: string, dir: string)
{
	var cpp_buffer =
`#include "` + name +`.hpp"  

`+name+`::`+ name +`()
{

}

`+name+`::~`+ name + `()
{

}`;
	var cpp_name = dir+"/"+name + '.cpp';
	fs.writeFile(cpp_name, cpp_buffer, function (err)
	{
		if (err) {
			console.error(err);
			return false;
		}
	});

	return true;
}

function create_class(name: string)
{
	var dir = vscode.workspace.rootPath+"/" + name;
	if (fs.existsSync(dir)){
		return false;
	}
	fs.mkdirSync(dir);

	var hpp = create_hpp(name, dir);
	var cpp = create_cpp(name, dir);

	return (hpp && cpp);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-class-creator" is now active!');

	let disposable = vscode.commands.registerCommand('extension.createClass', () => {
		// The code you place here will be executed every time your command is executed
		var input = create_input().then(function (res)
		{
			if (!res)
			{
				vscode.window.showErrorMessage("Your Class could not be created!");
				return;
			}
			var out = create_class(res);
			if(out)
				vscode.window.showInformationMessage('Your Class ' + res + '  has been created!');
			else
				vscode.window.showErrorMessage('Your Class ' + res + '  has been not created!');
		});
		// Display a message box to the user

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
