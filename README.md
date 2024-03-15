# A simple C++ Class Creator with multiple settings :alien:

Hey I'm Maxim. I wanted created a little c++ extension to create classes.

I can work on it when I have time in order to improve it. Just open some Issues or Pull Request. Im happy to work on them!

## Info about v1.0

In order to increase the flexiblity I implemented a command pattern which can be used to customize own presets for header/source files and it's names. For that I removed all customization options which I added in version <1.0. All of this options can be replaced with the new way of handling the files.

The syntax is {{\*COMMAND\*}} eg. {{\*CLASSNAME\*}}

#### Available Commands:

For file name presets: 
- CLASSNAMEUPPER - default classname to upper
- CLASSNAMELOWER - default classname to lower
- CLASSNAMECAPI  - default classname with capitalized first letter
- CLASSNAME      - default classname
- CURRENTDATETIME - current date and time
- CURRENTDATE    - current date
- CURRENTTIME    - current time

For file content presets:

- HEADERFILENAME - default headerfilename as entered in settings
- SOURCEFILENAME - default sourcefilename as entered in settings
- CLASSNAMEUPPER - default classname to upper
- CLASSNAMELOWER - default classname to lower
- CLASSNAMECAPI  - default classname with capitalized first letter
- CLASSNAME      - default classname
- CURRENTDATETIME - current date and time
- CURRENTDATE    - current date
- CURRENTTIME    - current time


## Features

Press **Alt**+**X** to open the Input Field to create a class, <span style="color:red">**while you are focusing the editor!**</span>

Type in the name, and there you go. You will directly see, when the file is created.

Additionaly you can set the path where the file has to be created and customize your own header/source file preset: check Settings at the bottom.

![Demo](https://github.com/tzAcee/cpp-class-creator/blob/master/giphy.gif?raw=true)

## Settings [settings.json of VS-Code]

```"cpp.creator.headerFileContentPreset": = "string"``` customize your created headerfile content with this setting. 

Default is:
```
   #ifndef {{*CLASSNAMEUPPER*}}_H
   #define {{*CLASSNAMEUPPER*}}_H
   
   #pragma once
   
   class {{*CLASSNAME*}}
   {
      public:
          {{*CLASSNAME*}}();
          ~{{*CLASSNAME*}}();
      private:
   };
   
   #endif
```

```"cpp.creator.sourceFileContentPreset": = "string"``` customize your created sourcefile content with this setting. 

Default is:
```
   #include "{{*HEADERFILENAME*}}"
   {{*CLASSNAME*}}::{{*CLASSNAME*}}()
   {

   }
   
   {{*CLASSNAME*}}::~{{*CLASSNAME*}}()
   {

   }
```

```"cpp.creator.sourceFileNamePreset": = "string"``` customize your sourcefile name with this setting.

Default is:
```
   {{*CLASSNAME*}}.cpp
```

```"cpp.creator.headerFileNamePreset": = "string"``` customize your headerfile name with this setting.

Default is:
```
   {{*CLASSNAME*}}.h
```

```"cpp.creator.setPath": = "string" | null | boolean : [NULL by default] ``` set your path where the class should be created as a string. When it's null your class will be created in the current workspace. Set it to true, when you want a input window to appear on every class creation where you can set creation path. On false or on an empty path input box it will also be created in the current workspace.

```"cpp.creator.createFolder": = boolean : [FALSE by default] ``` set it to true, so a folder for the class will be created in your workspace -> Only possible when setPath is null.

---

Have fun.

Make Pull Request when you have feature ideas & if you want, support me by sponsoring my github account :)

### Changelog

- See Info about v1.0

**Enjoy!**

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007
