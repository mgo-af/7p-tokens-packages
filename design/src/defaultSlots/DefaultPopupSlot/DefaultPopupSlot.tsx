import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";

import { PopupSlotProps } from "../../slots/popup/types";
import { DefaultPopupSlotTrigger } from "./DefaultPopupSlotTrigger";
import { mapPopupAlign, mapPopupSide } from "./utils";


export const DefaultPopupSlot: FC<PopupSlotProps> = ({
    isOpen,
    buttonProps,
    children,
    side,
    sideOffset = 15,
    align,
    alignOffset = 0,
    beak,
    zIndex = 100,
    onOpenChange,
    ...rest
}) => {
    return (
        <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
            <Popover.Trigger asChild>
                <DefaultPopupSlotTrigger {...buttonProps} />
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
                <PopoverContent
                    $zIndex={zIndex}
                    side={mapPopupSide(side)}
                    align={mapPopupAlign(align)}
                    sideOffset={sideOffset * 2}
                    alignOffset={alignOffset * 2}
                    {...rest}
                >
                    {children}
                    {beak && <PopoverArrow />}
                </PopoverContent>
            </Popover.Portal>
        </Popover.Root>
    );
};

const PopoverContent = styled(Popover.Content) <{ $zIndex: number; }>`
    padding: ${p => p.theme.spacing.s};
    background-color: ${p => p.theme.color.background.surface.primary};
    box-shadow: ${p => p.theme.shadow.s};
    border-radius: ${p => p.theme.radii.s};
    z-index: ${p => p.$zIndex};
`;

const PopoverArrow = styled(Popover.Arrow)`
    color: ${p => p.theme.color.background.surface.primary};
    fill: currentColor;
`;
