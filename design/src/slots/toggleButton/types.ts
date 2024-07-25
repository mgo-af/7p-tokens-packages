import { ButtonSlotProps } from "../button";


export type ToggleButtonSlotProps = Omit<ButtonSlotProps, "kind" | "onClick"> & {
    checked?: boolean;
    onChange?: (value: boolean) => void;
};
