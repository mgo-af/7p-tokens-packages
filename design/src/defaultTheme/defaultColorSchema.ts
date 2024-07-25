import React from "react";


export type ThemeVariables = Record<string, string>;

export type ThemeStyles = React.CSSProperties | ThemeVariables;

export enum DefaultColorSchema {
    LIGHT = "light",
    DARK = "dark"
}
