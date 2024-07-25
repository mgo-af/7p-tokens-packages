import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { ButtonGroupSlotProps } from "./types";


export const ButtonGroupSlot: FC<ButtonGroupSlotProps> = (props) => {
    const ButtonGroupSlotPrimitive = useSlot("buttonGroup");
    return <ButtonGroupSlotPrimitive {...props} />;
};
