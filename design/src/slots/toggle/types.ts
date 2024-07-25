import { DefaultSlotProps } from "../types";


export type ToggleSlotProps = DefaultSlotProps & {
    value?: boolean;
    label?: string;
    onLabel?: string;
    offLabel?: string;
    onToggle?: (value: boolean) => void;
};
