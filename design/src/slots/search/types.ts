import { TextInputSlotProps } from "../textInput";


export type SearchSlotProps = Omit<TextInputSlotProps, "label"> & {
    debounceRate?: number;
};
