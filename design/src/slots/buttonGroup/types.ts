import { DefaultSlotProps, SlotSize } from "../types";


export type ButtonGroupItemProps = {
    value: string;
    text: string;
};

export type ButtonGroupSlotProps = DefaultSlotProps & {
    items: ButtonGroupItemProps[];

    /**
     * If true, the button group will be selectable.
     * Once it's selected, it can be unselected by clicking on it again,
     * or by selecting another item.
     * 
     * If false, the button group will behave like a collection of buttons
     * that can only be clicked once.
     * 
     * @default true
     */
    selectable?: boolean;
    selected?: string;
    size?: SlotSize;
    onClick?: (value: string) => void;
    prefix?: string;
    prefixVisible?: boolean;
};
