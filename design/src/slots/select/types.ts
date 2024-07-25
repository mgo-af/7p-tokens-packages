import { OptionItem } from "../common/types";
import { DefaultSlotProps, SlotSize } from "../types";


export type SelectOptionItem = OptionItem;

export type SelectSlotProps = DefaultSlotProps & {
    options: SelectOptionItem[];
    selected?: SelectOptionItem[];
    placeholder?: string;
    onChange?: (options: SelectOptionItem[]) => void;
    size?: SlotSize;
    searchable?: boolean;
    multiselect?: boolean;
};
