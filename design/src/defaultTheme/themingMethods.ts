import { ThemeStyles } from "./defaultColorSchema";


export const combineThemeStyles = (...styles: ThemeStyles[]): ThemeStyles => {
    let result: ThemeStyles = {};

    for (const style of styles) {
        result = { ...result, ...style };
    }

    return result;
};

export const getRawStyles = (themeStyles: ThemeStyles): string => {
    let result = "";

    for (const varName in themeStyles) {
        result += `${varName}: ${(themeStyles as never)[varName]};`;
    }

    return result;
};
