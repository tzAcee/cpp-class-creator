// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { class_creator } from './class_creator';
import {vscode_helper} from "./vscode_helper";

function create_hpp_buffer(name: string)
{
const ifndef_head = 
    `#ifndef `+name.toUpperCase()+`_H
    #define `+name.toUpperCase()+`_H`;

const pragma_once_buffer =`#pragma once`;
var default_info;

if (vscode.workspace.getConfiguration().get("cpp.creator.privateFirst") as boolean === true)
{
default_info = `
class ` + name +`  
{
public:
    `+ name +`();
    ~`+name+`();

private:

};`;
}
else 
{
default_info = `
class ` + name +`  
{
private:

public:
    `+ name +`();
    ~`+name+`();

};`;
}
    const ifndef_end= `#endif`;

    var output : string;
    const useIfnDef : boolean = vscode.workspace.getConfiguration().get("cpp.creator.headerProtection.useIfnDef") as boolean;
    const usePragma : boolean = vscode.workspace.getConfiguration().get("cpp.creator.headerProtection.usePragmaOnce") as boolean;

    if(useIfnDef && usePragma)
    {
        output = ifndef_head+pragma_once_buffer+default_info+ifndef_end;
    }
    else if(useIfnDef)
    {
        output = ifndef_head+default_info+ifndef_end;		
    }
    else if(usePragma)
    {
        output = pragma_once_buffer+default_info;
    }
    else
    {
        output = default_info;
    }

    return output;
}

function get_include_name(name: string)
{
    var include_name: string;
    if (vscode.workspace.getConfiguration().get("cpp.creator.useHPPEnding") as boolean === true)
    {
        include_name = name + '.hpp';
    }
    else 
    {
        include_name = name + '.h';
    }
    
    return include_name;
}

function create_hpp(name: string, dir: string)
{
    var hpp_buffer = create_hpp_buffer(name);
    var hpp_name = dir+"/"+get_include_name(name);
    fs.writeFile(hpp_name, hpp_buffer, function (err)
    {
        if (err) {
            console.error(err);
            return false;
        }
    });


    return true;
}

function create_cpp_buffer(name: string)
{
    var hpp_name = get_include_name(name);
    var cpp_buffer =`#include "` + hpp_name + `"

`+name+`::`+ name +`()
{

}

`+name+`::~`+ name + `()
{

}`;

    return cpp_buffer;
}

function create_cpp(name: string, dir: string)
{
    var cpp_buffer = create_cpp_buffer(name);
    var cpp_file_name;
	if (vscode.workspace.getConfiguration().get("cpp.creator.useCCEnding") === true)
	{
		cpp_file_name = name + '.cc';
	}
	else {
		cpp_file_name = name + '.cpp';
	}
    var cpp_path_and_file_name = dir+"/"+cpp_file_name;
    fs.writeFile(cpp_path_and_file_name, cpp_buffer, function (err)
    {
        if (err) {
            console.error(err);
            return false;
        }
    });

    return true;
}

function create_class(name: string, dir: string)
{
    if (fs.existsSync(dir)) {
        var stats = fs.lstatSync(dir);

        if (!stats.isDirectory()) {
            return false; // if the give directory path, isnt a directory, you cant create a class
        }
    }
    else
        fs.mkdirSync(dir); // if the path doesnt exist, just create the directory

    var hpp = create_hpp(name, dir);
    var cpp = create_cpp(name, dir);

    return (hpp && cpp);
}

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
            var header_preset = vscode.workspace.getConfiguration().get("cpp.creator.headerFileContentPreset") as string;
            var source_file_preset = vscode.workspace.getConfiguration().get("cpp.creator.sourceFileContentPreset") as string;
            var creator = new class_creator(res as string, header_preset, source_file_preset, dir as string)
            vscode_helper.check_endings(creator); // checking for fileendings in the settings and adjusting the creator
			var out = creator.create_files(); // if setPath was neither false, null or true, it was a ststring, so maybe a valid path? 
																  //Create the class there
			if (out)
			{
					vscode.window.showInformationMessage('Your Class ' + res + '  has been created!');
			}
			else
			{
				vscode.window.showErrorMessage('Your Class ' + res + '  has been not created!');
			}
		});
		// Display a message box to the user

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
