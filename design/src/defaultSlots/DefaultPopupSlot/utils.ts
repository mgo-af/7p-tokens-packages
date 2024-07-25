import { PopupSlotAlign, PopupSlotSide } from "../../slots/popup/types";


export const mapPopupSide = (side: PopupSlotSide) => {
    switch (side) {
        case PopupSlotSide.Top: return "top";
        case PopupSlotSide.Left: return "left";
        case PopupSlotSide.Right: return "right";
        case PopupSlotSide.Bottom:
        default: return "bottom";
    }
};

export const mapPopupAlign = (align: PopupSlotAlign) => {
    switch (align) {
        case PopupSlotAlign.Center: return "center";
        case PopupSlotAlign.End: return "end";
        case PopupSlotAlign.Start:
        default: return "start";
    }
};
