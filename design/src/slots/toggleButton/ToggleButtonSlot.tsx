import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { ToggleButtonSlotProps } from "./types";


export const ToggleButtonSlot: FC<ToggleButtonSlotProps> = (props) => {
    const ToggleButtonSlotPrimitive = useSlot("toggleButton");
    return <ToggleButtonSlotPrimitive {...props} />;
};
