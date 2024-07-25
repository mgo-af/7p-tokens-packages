import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

import theme from "../autogen/theme/theme";
import { SlotsProvider, SlotsProviderProps } from "../slots/SlotsProvider";


type DesignProviderProps = SlotsProviderProps;

export const DesignProvider: FC<DesignProviderProps> = ({ children, slots }) => {
    return (
        <ThemeProvider theme={theme}>
            <SlotsProvider slots={slots}>
                {children}
            </SlotsProvider>
        </ThemeProvider>
    );
};
