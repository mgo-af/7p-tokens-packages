import { Theme } from "../autogen/theme/theme";

import "styled-components";


declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme { }
}
