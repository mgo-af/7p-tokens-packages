import React, { FC } from "react";

import { useSlot } from "../useSlot";
import { SearchSlotProps } from "./types";


export const SearchSlot: FC<SearchSlotProps> = (props) => {
    const SearchSlotPrimitive = useSlot("search");
    return <SearchSlotPrimitive {...props} />;
};
