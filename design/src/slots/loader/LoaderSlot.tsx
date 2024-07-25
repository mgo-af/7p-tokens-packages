import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { LoaderSlotProps } from "./types";


export const LoaderSlot: FC<LoaderSlotProps> = (props) => {
    const LoaderSlotPrimitive = useSlot("loader");
    return <LoaderSlotPrimitive {...props} />;
};
