import React from "react";

import { ButtonSlotProps } from "../button";
import { DefaultSlotProps } from "../types";


export enum PopupSlotSide {
    Bottom, Top, Left, Right
}

export enum PopupSlotAlign {
    Start, Center, End
}

export type PopupSlotProps = Omit<DefaultSlotProps, "disabled" | "tabIndex"> & React.PropsWithChildren<{
    buttonProps: ButtonSlotProps;
    isOpen?: boolean;
    beak?: boolean;
    side?: PopupSlotSide;
    sideOffset?: number;
    align?: PopupSlotAlign;
    alignOffset?: number;
    zIndex?: number;
    // AZ: uncontrolled close from popup, for example on click outside
    onOpenChange?: (value: boolean) => void;
}>;
