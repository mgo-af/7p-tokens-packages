import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { DatePickerSlotProps } from "./types";


export const DatePickerSlot: FC<DatePickerSlotProps> = (props) => {
    const DatePickerSlotPrimitive = useSlot("datePicker");
    return <DatePickerSlotPrimitive {...props} />;
};
