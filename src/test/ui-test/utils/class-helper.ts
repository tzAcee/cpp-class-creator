import * as fs from "fs";
import { until } from "./util";

export class ClassHelper
{
    static async fileExistsWithContent(path: string, content: string, deleteAfterwards: boolean)
    {
        if(await until(()=>fs.existsSync(path), 1000))
        {
            console.error(`${path} does not exist.`)
            return false;
        }

        const fileContent = fs.readFileSync(path).toString();
        if(fileContent != content)
        {
            console.error(`contents are not equal.`);
            console.error("in file:", fileContent);
            console.error("exp:", content);
            return false;
        }

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