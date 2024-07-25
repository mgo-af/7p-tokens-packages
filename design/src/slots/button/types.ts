import React from "react";

import { IconSlotType } from "../icon";
import { DefaultSlotProps, SlotSize } from "../types";


export enum ButtonKind {
    Primary,
    Secondary,
    Tertiary
}

export type ButtonSlotProps = DefaultSlotProps & React.PropsWithChildren<{
    text?: string;
    icon?: IconSlotType;
    kind?: ButtonKind;
    size?: SlotSize;
    active?: boolean;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;
