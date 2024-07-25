import React, { FC } from "react";
import { stringUtils } from "@7pace/utilities";
import styled from "styled-components";

import { IconSlotProps } from "../../slots/icon/types";
import { SlotSize } from "../../slots/types";
import { defaultIcons } from "./defaultIcons";


export const DefaultIconSlot: FC<IconSlotProps> = ({ type, size, className, ...rest }) => {
    if (type == null) {
        return;
    }

    const laIcon = defaultIcons[type];
    const iconClassName = stringUtils.constructClasses("las", laIcon, className);

    return laIcon && <Icon $size={size} className={iconClassName} {...rest} />;
};

const iconSizeToPx = (size: SlotSize) => {
    switch (size) {
        case (SlotSize.Small): return "14px";
        case (SlotSize.Large): return "20px";
        case (SlotSize.Medium):
        default:
            return "18px";
    }
};

const Icon = styled.i<{ $size: SlotSize; }>`
    width: ${p => iconSizeToPx(p.$size)};
    height: ${p => iconSizeToPx(p.$size)};
    font-size: ${p => iconSizeToPx(p.$size)};
`;
