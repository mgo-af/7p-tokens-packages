import React, { PropsWithChildren } from "react";

import { DefaultSlotProps } from "../types";


export enum TooltipSlotDirection {
    Top,
    Bottom,
    Left,
    Right
}

export enum TooltipSlotDelay {
    None,
    Medium,
    Long
}

export type TooltipSlotProps = PropsWithChildren<Pick<DefaultSlotProps, "id" | "className" | "data-testid"> & {
    content: string | React.ReactNode;
    hidden?: boolean;
    delay?: TooltipSlotDelay;
    closeDelay?: TooltipSlotDelay;
    directionalHint?: TooltipSlotDirection;
    hideOnHover?: boolean;
    hideBeak?: boolean;
    offset?: number;
    openByDefault?: boolean;
    zIndex?: number;
}>;
