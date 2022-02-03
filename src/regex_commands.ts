export abstract class regex_commands
{
    public static default(str: string) : string
    {
        return str;
    }
    
    public static lower_case(str: string) : string
    {
        return str.toLowerCase();
    }

    public static upper_case(str: string) : string
    {
        return str.toUpperCase();
    }

    public static capitalize(str: string) : string
    {
        return str[0].toUpperCase() + str.substring(1);
    }

    public static header_file(h_file: string) : string
    {
        return h_file;
    }

    public static source_file(s_file: string) : string
    {
        return s_file;
    }
}