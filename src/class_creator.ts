import * as fs from 'fs';
import * as path from 'path';

export class class_creator
{
    header_file_content: string = "";
    source_file_content: string = "";
    class_name: string = "";
    create_location: string = "";
    hpp_ending = false;
    cc_ending = false;

    constructor(class_name: string, header_preset: string, source_file_preset: string, create_location: string) 
    {
        this.class_name = class_name;
        this.header_file_content = header_preset;
        this.source_file_content = source_file_preset;
        this.create_location = create_location;
        this.parse();
    }
    get_include_name()
    {
        var include_name: string;
        if (this.hpp_ending === true)
        {
            include_name = this.class_name + '.hpp';
        }
        else 
        {
            include_name = this.class_name + '.h';
        }
        
        return include_name;
    }
    get_source_file_name()
    {
        var cpp_file_name;
        if (this.cc_ending === true)
        {
            cpp_file_name = this.class_name + '.cc';
        }
        else {
            cpp_file_name = this.class_name + '.cpp';
        }
        return cpp_file_name;
    }
    enable_hpp_ending()
    {
        this.hpp_ending = true;
    }
    enable_cc_ending()
    {
        this.cc_ending = true;
    }
    parse()
    {
        /* Current commands:
        CLASSNAME - default classname
        CLASSNAMEUPPER - default classname to upper
        CLASSNAMELOWER - default classname to lower
        */
        var upper_class_name = this.class_name.toUpperCase();
        var lower_class_name = this.class_name.toLocaleLowerCase();

        var upper_regex = "{{\*CLASSNAMEUPPER\*}}";
        var lower_regex = "{{\*CLASSNAMELOWER\*}}";
        var default_regex = "{{\*CLASSNAME\*}}";

        this.header_file_content.replace(upper_regex, upper_class_name);
        this.header_file_content.replace(lower_regex, lower_class_name);
        this.header_file_content.replace(default_regex, this.class_name);

        this.source_file_content.replace("{{*CLASSNAMEUPPER*}}", upper_class_name);
        this.source_file_content.replace("{{*CLASSNAMELOWER*}}", lower_class_name);
        this.source_file_content.replace("{{*CLASSNAME*}}", this.class_name);
    }
    create_header_file()
    {
        var hpp_name = this.create_location+"/"+this.get_include_name();
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
        var cpp_path_and_file_name = this.create_location+"/"+this.get_source_file_name();
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