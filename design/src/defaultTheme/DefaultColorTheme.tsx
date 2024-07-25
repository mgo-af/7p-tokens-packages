import React, { useMemo } from "react";
import { createGlobalStyle } from "styled-components";

import { darkThemeVariables } from "./variables/darkThemeVariables";
import { lightThemeVariables } from "./variables/lightThemeVariables";
import { DefaultColorSchema, ThemeStyles } from "./defaultColorSchema";
import { combineThemeStyles, getRawStyles } from "./themingMethods";


type ThemeBaseProps = {
    rootElement?: string;
};

type ThemeComponentProps = {
    rawStyles: string;
} & ThemeBaseProps;

type ThemeProps = {
    schema: DefaultColorSchema;
    extension?: Record<DefaultColorSchema, ThemeStyles[]>;
} & ThemeBaseProps;

const ThemeComponent = createGlobalStyle<ThemeComponentProps>`
    ${props => props.rootElement || "body"} {
        ${props => props.rawStyles}
    }
`;

export const DefaultColorTheme: React.FC<ThemeProps> = ({ rootElement, schema, extension }: ThemeProps) => {
    const styles: ThemeStyles = useMemo(() => {
        switch (schema) {
            case DefaultColorSchema.LIGHT: {
                return lightThemeVariables;
            }
            case DefaultColorSchema.DARK: {
                return darkThemeVariables;
            }
            default: {
                throw new Error(`${schema} is unknown color theme!`);
            }
        }
    }, [schema]);

    const rawStyles = useMemo(() => {
        const args = extension?.[schema] ? combineThemeStyles(styles, ...extension[schema]) : styles;
        return getRawStyles(combineThemeStyles(args));
    }, [styles, extension, schema]);

    return <React.Fragment>
        <ThemeComponent rootElement={rootElement} rawStyles={rawStyles} />
    </React.Fragment>;
};
