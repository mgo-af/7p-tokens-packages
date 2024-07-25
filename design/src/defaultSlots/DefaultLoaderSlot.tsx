import React, { FC } from "react";
import styled from "styled-components";

import { slotSizeToSizeToken } from "./common/helpers";
import { LoaderSlotProps } from "../slots/loader/types";
import { SlotSize } from "../slots/types";


export const DefaultLoaderSlot: FC<LoaderSlotProps> = ({
    size = SlotSize.Medium
}) => {
    return (
        <DefaultLoaderSlotWrapper $size={size} />
    );
};

const DefaultLoaderSlotWrapper = styled.div<{ $size: SlotSize; }>`
    width: ${p => slotSizeToSizeToken(p.$size, p.theme)};
    height: ${p => slotSizeToSizeToken(p.$size, p.theme)};

    border: solid transparent;
    border-top-color: ${p => p.theme.color.background.surface.contrastInverted};
    border-radius: ${p => p.theme.radii.circular};
    border-width: ${p => {
        switch (p.$size) {
            case SlotSize.Small:
                return "2px";
            case SlotSize.Medium:
                return "3px";
            case SlotSize.Large:
                return "4px";
        }
    }};

    opacity: ${p => p.theme.opacity.loading};

    animation: rotate 1s linear infinite;

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(360deg);
        }
    }
`;
