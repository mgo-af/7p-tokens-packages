import React, { FC } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import styled, { css } from "styled-components";

import { DefaultIconSlot } from "./DefaultIconSlot/DefaultIconSlot";
import { ToggleButtonSlotProps } from "../slots/toggleButton/types";
import { SlotSize } from "../slots/types";


export const DefaultToggleButtonSlot: FC<ToggleButtonSlotProps> = ({
    text,
    icon,
    checked,
    size = SlotSize.Medium,
    children,
    onChange,
    ...rest
}) => {
    return (
        <ToggleRoot
            {...rest}
            $size={size}
            pressed={checked}
            onPressedChange={onChange}
        >
            {icon != null && <DefaultIconSlot type={icon} size={size} />}
            {children || text}
        </ToggleRoot>
    );
};

const ToggleRoot = styled(Toggle.Root) <{ $size: SlotSize; }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${p => p.theme.spacing.xs};
    border: none;
    border-radius: ${p => p.theme.radii.s};
    color: ${p => p.theme.color.foreground.icon.tertiary};
    background-color: ${p => p.theme.color.background.accent.tertiary.rest};

    cursor: pointer;

    &[data-state='on'] {
        color: ${p => p.theme.color.foreground.icon.secondary};
        background-color: ${p => p.theme.color.background.accent.secondary.active};
    }

    ${p => p.disabled && css`
        background-color: ${p => p.theme.color.background.accent.disabled};
        cursor: default;
    `}

    :hover:enabled {
        background-color: ${p => p.theme.color.background.accent.tertiary.hover};
    }

    :active:enabled {
        background-color: ${p => p.theme.color.background.accent.tertiary.active};
    }
`;
