import { OptionItem } from "../common/types";
import { DefaultSlotProps } from "../types";


export type MenuButtonOption = OptionItem;

export type MenuButtonSlotProps = DefaultSlotProps & {
    options: MenuButtonOption[];
    selected?: MenuButtonOption;
    placeholder?: string;
    itemClassName?: string;
    calloutClassName?: string;
    onChange?: (option: MenuButtonOption) => void;
};
