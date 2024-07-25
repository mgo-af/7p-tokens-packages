import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { TextInputSlotProps } from "./types";


export const TextInputSlot: FC<TextInputSlotProps> = (props) => {
    const TextInputSlotPrimitive = useSlot("textInput");
    return <TextInputSlotPrimitive {...props} />;
};
