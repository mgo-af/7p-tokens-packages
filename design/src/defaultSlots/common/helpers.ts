import { Theme } from "../../autogen/theme/theme";
import { SlotSize } from "../../slots/types";


export const slotSizeToSizeToken = (size: SlotSize, theme: Theme) => {
    switch (size) {
        case (SlotSize.Small): return theme.size.s;
        case (SlotSize.Large): return theme.size.l;
        case (SlotSize.Medium):
        default:
            return theme.size.m;
    }
};
