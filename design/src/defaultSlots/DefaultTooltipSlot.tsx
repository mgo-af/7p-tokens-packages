import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styled from "styled-components";

import { TooltipSlotDelay, TooltipSlotProps } from "../slots/tooltip/types";


const mapDelay = (delay: TooltipSlotDelay): number => {
    switch (delay) {
        case TooltipSlotDelay.Medium:
            return 300;
        case TooltipSlotDelay.Long:
            return 700;
        case TooltipSlotDelay.None:
        default:
            return 0;
    }
};

export const DefaultTooltipSlot: React.FC<TooltipSlotProps> = ({
    children,
    content,
    hidden,
    id,
    delay,
    className,
    hideOnHover,
    hideBeak,
    offset,
    openByDefault,
    zIndex = 999,
    "data-testid": dataTestId
    // closeDelay,
    // directionalHint,
}) => {
    if (hidden) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <Tooltip.Provider
            delayDuration={mapDelay(delay)}
            disableHoverableContent={hideOnHover}
        >
            <Tooltip.Root defaultOpen={openByDefault}>
                <Tooltip.Trigger asChild>
                    {children}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <TooltipContent
                        id={id || ""}
                        className={className || ""}
                        sideOffset={offset}
                        $zIndex={zIndex}
                        data-testid={dataTestId}
                    >
                        <div>{content}</div>
                        {!hideBeak && <TooltipArrow />}
                    </TooltipContent>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

const TooltipContent = styled(Tooltip.Content) <{ $zIndex: number; }>`
    background-color: ${p => p.theme.color.background.surface.contrastInverted};
    color: ${p => p.theme.color.foreground.text.inverted};
    border-radius: ${p => p.theme.radii.s};
    padding: ${p => p.theme.spacing.s};
    font: ${p => p.theme.typography.body.regular.m};
    z-index: ${p => p.$zIndex};
`;

const TooltipArrow = styled(Tooltip.Arrow)`
    fill: ${p => p.theme.color.background.surface.contrastInverted};
`;
