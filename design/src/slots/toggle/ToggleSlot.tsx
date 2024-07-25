import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { ToggleSlotProps } from "./types";


export const ToggleSlot: FC<ToggleSlotProps> = (props) => {
    const ToggleSlotPrimitive = useSlot("toggle");
    return <ToggleSlotPrimitive {...props} />;
};
