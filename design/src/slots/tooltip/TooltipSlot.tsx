import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { TooltipSlotProps } from "./types";


export const TooltipSlot: FC<TooltipSlotProps> = (props) => {
    const TooltipSlotPrimitive = useSlot("tooltip");
    return <TooltipSlotPrimitive {...props} />;
};
