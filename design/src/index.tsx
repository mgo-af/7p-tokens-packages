import theme, { Theme } from "./autogen/theme/theme";
import ThemeSystem from "./autogen/theme/ThemeSystem";
import { DesignProvider } from "./components/DesignProvider";
import { DefaultColorSchema } from "./defaultTheme/defaultColorSchema";
import { DefaultColorTheme } from "./defaultTheme/DefaultColorTheme";
import { Slots } from "./slots/SlotsProvider";
import { getThemeTokenValue } from "./utils/getThemeTokenValue";


export * from "./declarations/styled";
export * from "./defaultSlots";
export * from "./slots";

export {
    DefaultColorSchema,
    DefaultColorTheme,
    DesignProvider,
    getThemeTokenValue,
    Slots,
    Theme,
    theme,
    ThemeSystem
};
