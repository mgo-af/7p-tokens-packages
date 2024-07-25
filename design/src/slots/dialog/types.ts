import React from "react";

import { DefaultSlotProps } from "../types";


export type DialogSlotProps = Pick<DefaultSlotProps, "id" | "className" | "data-testid"> & React.PropsWithChildren<{
    isOpen: boolean;
    title?: string;
    width?: number;
    showCloseButton?: boolean;
    closeOnClickOutside?: boolean;
    onClose?: () => void;
}>;
