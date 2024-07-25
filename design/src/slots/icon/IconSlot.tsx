import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { IconSlotProps } from "./types";


export const IconSlot: FC<IconSlotProps> = (props) => {
    const IconSlotPrimitive = useSlot("icon");
    return <IconSlotPrimitive {...props} />;
};
