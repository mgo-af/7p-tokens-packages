import { DefaultSlotProps } from "../types";


export type RadioGroupItemProps = {
    value: string;
    text: string;
};

export enum RadioGroupOrientation {
    Horizontal = "horizontal",
    Vertical = "vertical"
}

export type RadioGroupSlotProps = DefaultSlotProps & {
    items: RadioGroupItemProps[];
    selected?: string;
    orientation?: RadioGroupOrientation;
    onSelect?: (value: string) => void;
};
