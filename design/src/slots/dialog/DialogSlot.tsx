import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { DialogSlotProps } from "./types";


export const DialogSlot: FC<DialogSlotProps> = (props) => {
    const DialogSlotPrimitive = useSlot("dialog");
    return <DialogSlotPrimitive {...props} />;
};
