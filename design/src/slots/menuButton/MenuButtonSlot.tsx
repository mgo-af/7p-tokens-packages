import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { MenuButtonSlotProps } from "./types";


export const MenuButtonSlot: FC<MenuButtonSlotProps> = (props) => {
    const MenuButtonSlotPrimitive = useSlot("menuButton");
    return <MenuButtonSlotPrimitive {...props} />;
};
