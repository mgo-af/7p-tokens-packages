import React, { forwardRef } from "react";

import { ButtonSlotProps } from "../../slots/button/types";
import { DefaultButtonSlot } from "../DefaultButtonSlot";


export const DefaultPopupSlotTrigger = forwardRef<HTMLButtonElement, ButtonSlotProps>((props, ref) => {
    return <DefaultButtonSlot {...props} />;
});
