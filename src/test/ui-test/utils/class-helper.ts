import * as fs from "fs";
import { until } from "./util";
import * as assert from "assert";
import { VSController } from "./vs-controller";



export class ClassHelper
{
    static async fileExists(path: string)
    {
        if(await until(()=>fs.existsSync(path), 1000))
        {
            console.error(`${path} does not exist.`)
            return false;
        }
        assert(fs.existsSync(path));
        return true;
    }

    static async fileExistsWithContent(className: string, path: string, content: string, deleteAfterwards: boolean)
    {
        assert(content != "");

        assert(await this.fileExists(path));

        let fileContent = "";

        await until(()=>{
            fileContent = fs.readFileSync(path).toString();
            return fileContent != "";
        }, 2000); 

        if(fileContent != content)
        {
            console.error(`contents are not equal.`);
            console.error("in file:", fileContent);
            console.error("exp:", content);
            return false;
        }

        const pathWithoutFileName = path.substring(0, path.lastIndexOf("/"));
        const expNotif = `Your class "${className}" has been created! (@${pathWithoutFileName})`;
        assert(await VSController.isNotificationSent(expNotif));

        if(deleteAfterwards)
        {
            fs.unlinkSync(path);
        }

        return true;
    }

    static defaultHeaderContent(className: string)
    {
        return `#ifndef ${className.toUpperCase()}_H
#define ${className.toUpperCase()}_H

#pragma once

class ${className}
{
public:
    ${className}();
    ~${className}();

private:

};

#endif`;
    }

    static defaultClassContent(className: string)
    {
    return `#include "${className}.h"

${className}::${className}()
{

}

${className}::~${className}()
{

}`;
    }
}