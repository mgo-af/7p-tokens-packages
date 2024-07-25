import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { RadioGroupSlotProps } from "./types";


export const RadioGroupSlot: FC<RadioGroupSlotProps> = (props) => {
    const RadioGroupSlotPrimitive = useSlot("radioGroup");
    return <RadioGroupSlotPrimitive {...props} />;
};
