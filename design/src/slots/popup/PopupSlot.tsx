import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { PopupSlotProps } from "./types";


export const PopupSlot: FC<PopupSlotProps> = (props) => {
    const PopupSlotPrimitive = useSlot("popup");
    return <PopupSlotPrimitive {...props} />;
};
