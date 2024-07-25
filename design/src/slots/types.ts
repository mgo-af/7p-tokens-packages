export enum SlotSize {
    Small,
    Medium,
    Large
}

export type DefaultSlotProps = {
    id?: string;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    "data-testid"?: string;
};

export type ErrorProps = {
    error: boolean;
    message?: string;
};
