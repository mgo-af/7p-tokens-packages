import { RefObject } from "react";

import { DefaultSlotProps, ErrorProps, SlotSize } from "../types";


export type TextInputSlotProps = DefaultSlotProps & {
    slotRef?: RefObject<HTMLInputElement>;
    value?: string;
    label?: string;
    placeholder?: string;
    errorProps?: ErrorProps;
    size?: SlotSize;
    clearable?: boolean;
    onClear?: () => void;
    onChange?: (value: string) => void;
};
