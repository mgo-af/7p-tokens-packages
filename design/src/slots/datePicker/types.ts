import { DefaultSlotProps, ErrorProps, SlotSize } from "../types";


export type DatePickerDateRange = {
    from: Date;
    to?: Date;
};

export type DatePickerButtonProps = Pick<DefaultSlotProps, "className" | "data-testid"> & {
    placeholder?: string;
    hideIcon?: boolean;
    size?: SlotSize;
};

export type DatePickerSlotProps = DefaultSlotProps & {
    selected?: DatePickerDateRange;
    label?: string;
    onChange?: (dateRange: DatePickerDateRange) => void;
    dateFormat?: string;
    dateRange?: boolean;
    monthShown?: number;
    minDate?: Date;
    maxDate?: Date;
    fdow?: number;
    buttonProps?: DatePickerButtonProps;
    errorProps?: ErrorProps;
};
