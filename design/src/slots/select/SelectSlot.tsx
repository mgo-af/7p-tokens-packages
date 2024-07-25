import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { SelectSlotProps } from "./types";


export const SelectSlot: FC<SelectSlotProps> = (props) => {
    const SelectSlotPrimitive = useSlot("select");
    return <SelectSlotPrimitive {...props} />;
};
