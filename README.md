# A simple C++ Class Creator with multiple settings :alien:

Hey I'm Maxim. I wanted created a little c++ extension to create classes.

I can work on it when I have time in order to improve it. Just open some Issues or Pull Request. Im happy to work on them!

## Features

Press **Alt**+**X** to open the Input Field to create a class, <span style="color:red">**while you are focusing the editor!**</span>

Type in the name, and there you go. You will directly see, when the file is created.

Additionaly you can set the path where the file has to be created: check Settings at the bottom.

![Demo](https://github.com/tzAcee/cpp-class-creator/blob/master/giphy.gif?raw=true)

## Known Issues

-Class can be created, while the language is not c++

## Settings [settings.json of VS-Code]
```"cpp.creator.headerProtection.useIfnDef": = boolean : [TRUE by default] ``` will add the default \*ifned, define, endif\* structure to the header file of the created class.

```"cpp.creator.headerProtection.usePragmaOnce": = boolean : [TRUE by default] ``` will add \*#pragma once\* to the header file of the created class.
Header Protection can be used in combination (ifndef and pragma once)

```"cpp.creator.setPath": = "string" | null | boolean : [NULL by default] ``` set your path where the class should be created as a string. When it's null your class will be created in the current workspace. Set it to true, when you want a input window to appear on every class creation where you can set creation path. On false or on an empty path input box it will also be created in the current workspace.

```"cpp.creator.createFolder": = boolean : [FALSE by default] ``` set it to true, so a folder for the class will be created in your workspace -> Only possible when setPath is null.

```"cpp.creator.useHPPEnding": = boolean : [TRUE by default] ``` set it to false, so the header ending will .h, if it's true, it will be .hpp.


---

Have fun.

Make Pull Request when you have feature ideas & if you want, support me by sponsoring my github account :)

### Changelog

- Added context menu class creation
- Added Header Protection settings
- little refactorings
- removed experimental settings


**Enjoy!**

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007
