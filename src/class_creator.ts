import * as fs from 'fs';
import { regex_commands } from './regex_commands';

type command_replace_model = {
    reg_expression: RegExp
    replace_string: string
}

export class class_creator
{
    header_file_content: string = "";
    source_file_content: string = "";
    class_name: string = "";
    create_location: string = "";
    header_file: string = "";
    source_file: string = "";

    constructor(class_name: string, header_preset: string, source_file_preset: string, create_location: string, source_file_name: string, header_file_name: string) 
    {
        this.class_name = class_name;
        this.header_file_content = header_preset;
        this.source_file_content = source_file_preset;
        this.create_location = create_location;
        this.header_file = header_file_name;
        this.source_file = source_file_name;
        this.parse();
    }

    parse()
    {
        var upper_regex             : RegExp = /{{\*CLASSNAMEUPPER\*}}/gi;
        var lower_regex             : RegExp = /{{\*CLASSNAMELOWER\*}}/gi;
        var cap_regex               : RegExp = /{{\*CLASSNAMECAPI\*}}/gi;
        var default_regex           : RegExp = /{{\*CLASSNAME\*}}/gi;
        var headerfilename_regex    : RegExp = /{{\*HEADERFILENAME\*}}/gi;
        var sourcefilename_regex    : RegExp = /{{\*SOURCEFILENAME\*}}/gi;
        var datetime_regex          : RegExp = /{{\*CURRENTDATETIME\*}}/gi;
        var date_regex              : RegExp = /{{\*CURRENTDATE\*}}/gi;
        var time_regex              : RegExp = /{{\*CURRENTTIME\*}}/gi;

        const file_cmds: Array<command_replace_model> = [
            { reg_expression: upper_regex, replace_string: regex_commands.upper_case(this.class_name)},// CLASSNAMEUPPER - default classname to upper
            { reg_expression: lower_regex, replace_string: regex_commands.lower_case(this.class_name)},// CLASSNAMELOWER - default classname to lower
            { reg_expression: cap_regex, replace_string: regex_commands.capitalize(this.class_name)},  // CLASSNAMECAPI  - default classname with capitalized first letter
            { reg_expression: default_regex, replace_string: regex_commands.default(this.class_name)}, // CLASSNAME      - default classname
        ]

        const content_cmds: Array<command_replace_model> = [
            { reg_expression: headerfilename_regex, replace_string: regex_commands.header_file(this.header_file)}, // HEADERFILENAME - default headerfilename as entered in settings
            { reg_expression: sourcefilename_regex, replace_string: regex_commands.source_file(this.source_file)}, // SOURCEFILENAME - default sourcefilename as entered in settings
            { reg_expression: upper_regex, replace_string: regex_commands.upper_case(this.class_name)},      // CLASSNAMEUPPER - default classname to upper
            { reg_expression: lower_regex, replace_string: regex_commands.lower_case(this.class_name)},      // CLASSNAMELOWER - default classname to lower
            { reg_expression: cap_regex, replace_string: regex_commands.capitalize(this.class_name)},        // CLASSNAMECAPI  - default classname with capitalized first letter
            { reg_expression: default_regex, replace_string: regex_commands.default(this.class_name)},       // CLASSNAME      - default classname
            { reg_expression: datetime_regex, replace_string: regex_commands.current_date_time()},      // CURRENTDATETIME  - the current date and time
            { reg_expression: date_regex, replace_string: regex_commands.current_date()},               // CURRENTDATE      - the current date
            { reg_expression: time_regex, replace_string: regex_commands.current_time()},               // CURRENTTIME      - the current time
            
        ]

        this.source_file = this.execute_replacement(file_cmds, this.source_file);
        this.header_file = this.execute_replacement(file_cmds, this.header_file);

        this.header_file_content = this.execute_replacement(content_cmds, this.header_file_content);
        this.source_file_content = this.execute_replacement(content_cmds, this.source_file_content);
    }

    execute_replacement(replacements: Array<command_replace_model>, execute_on: string)
    {
        replacements.forEach(elem => {
            execute_on = execute_on.replace(elem.reg_expression, elem.replace_string)
        });
        return execute_on;
    } 

    create_header_file()
    {
        var hpp_name = this.create_location+"/"+this.header_file;
        fs.writeFile(hpp_name, this.header_file_content, function (err)
        {
            if (err) {
                console.error(err);
                return false;
            }
        });
    
    
        return true;
    }
    create_source_file()
    {
        var cpp_path_and_file_name = this.create_location+"/"+this.source_file;
        fs.writeFile(cpp_path_and_file_name, this.source_file_content, function (err)
        {
            if (err) {
                console.error(err);
                return false;
            }
        });
    
        return true;
    }
    create_files()
    {
        if (fs.existsSync(this.create_location)) {
            var stats = fs.lstatSync(this.create_location);
    
            if (!stats.isDirectory()) {
                return false; // if the give directory path, isnt a directory, you cant create a class
            }
        }
        else
            fs.mkdirSync(this.create_location); // if the path doesnt exist, just create the directory
    
        var hpp = this.create_header_file();
        var cpp = this.create_source_file();
    
        return (hpp && cpp);
    }
}