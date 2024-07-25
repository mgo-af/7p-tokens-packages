import { DefaultSlotProps } from "../types";


export type CheckboxSlotProps = DefaultSlotProps & {
    label?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
};
