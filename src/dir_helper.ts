import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { vscode_helper } from "./vscode_helper";

export class dir_helper
{
    _dir: string | boolean | undefined;
    _args: any
    constructor(dir: any, args: any)
    {
        this._dir = dir;
        this._args = args;
    }

    async check_context_menu()
    {
        if (this._args != null && this._args.fsPath != null) {
            this._dir = this._args.fsPath;
            if (typeof this._dir === "string" && fs.existsSync(this._dir)) {
                var stats = fs.lstatSync(this._dir);
                if (!stats.isDirectory()) {
                    //If it's not a directory then it's the file so get the parent directory
                    this._dir = path.dirname(this._args.fsPath);
                }
            }
        }
    }

    async check_boolean_null(res: string | undefined)
    {
			// If it's called via the context menu, it's gonna have the fsPath set from where you're clicking
			if (this._dir == null || this._dir == false) {
				this._dir = vscode.workspace.rootPath as string; // use workspace path
				let createFolder: boolean | undefined = vscode.workspace.getConfiguration().get("cpp.creator.createFolder");
				    if (createFolder) // create the folder where to put the class
					    this._dir += "/" + res;
			}
			else if (this._dir == true)
			{
				this._dir = await vscode_helper.create_path_input(); // ask for path
				    if (!this._dir)
				    {
					    this._dir = vscode.workspace.rootPath as string; // if empty input, just use workspace path
				    }
			}
    }

    dir()
    {
        return this._dir as string;
    }
}