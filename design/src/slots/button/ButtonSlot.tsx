import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { ButtonSlotProps } from "./types";


export const ButtonSlot: FC<ButtonSlotProps> = (props) => {
    const ButtonSlotPrimitive = useSlot("button");
    return <ButtonSlotPrimitive {...props} />;
};
