import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { CheckboxSlotProps } from "./types";


export const CheckboxSlot: FC<CheckboxSlotProps> = (props) => {
    const CheckboxSlotPrimitive = useSlot("checkbox");
    return <CheckboxSlotPrimitive {...props} />;
};
