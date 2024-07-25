import React, { FC } from "react";
import styled, { css } from "styled-components";

import { slotSizeToSizeToken } from "./common/helpers";
import { DefaultIconSlot } from "./DefaultIconSlot/DefaultIconSlot";
import { ButtonKind, ButtonSlotProps } from "../slots/button/types";
import { SlotSize } from "../slots/types";


export const DefaultButtonSlot: FC<ButtonSlotProps> = ({
    text,
    icon,
    kind = ButtonKind.Primary,
    size = SlotSize.Medium,
    children,
    active,
    loading,
    disabled,
    onClick,
    ...rest
}) => {
    return (
        <DefaultButtonSlotWrapper
            $kind={kind}
            $size={size}
            onClick={onClick}
            $active={active}
            disabled={disabled || loading}
            {...rest}
        >
            {icon != null && <DefaultIconSlot type={icon} size={size} />}
            {loading ? "Loading..." : children || text}
        </DefaultButtonSlotWrapper>
    );
};

type DefaultButtonSlotWrapperProps = {
    $kind: ButtonKind;
    $size: SlotSize;
    $active: boolean;
};

const DefaultButtonSlotWrapper = styled.button<DefaultButtonSlotWrapperProps>`
    display: flex;
    height: ${p => slotSizeToSizeToken(p.$size, p.theme)};
    justify-content: center;
    align-items: center;
    gap: ${p => p.theme.spacing.xs};
    padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.s};
    border: none;
    border-radius: ${p => p.theme.radii.s};
    cursor: pointer;

    ${p => p.disabled && css`
        color: ${p => p.theme.color.foreground.text.tertiary};
        background-color: ${p => p.theme.color.background.accent.disabled};
        cursor: default;
        pointer-events: none;
    `}

    ${p => p.$kind === ButtonKind.Primary && css<DefaultButtonSlotWrapperProps>`
        color: ${p => p.theme.color.foreground.text.contrast};
        background-color: ${p => p.$active ?
            p.theme.color.background.accent.primary.active :
            p.theme.color.background.accent.primary.rest
        };

        :hover {
            background-color: ${p => p.theme.color.background.accent.primary.hover};
        }

        :active {
            background-color: ${p => p.theme.color.background.accent.primary.active};
        }
    `}

    ${p => p.$kind === ButtonKind.Primary && p.$active && css`
        background-color: ${p => p.theme.color.background.accent.primary.active};
    `}

    ${p => p.$kind === ButtonKind.Secondary && css<DefaultButtonSlotWrapperProps>`
        color: ${p => p.theme.color.foreground.text.primary};
        background-color: ${p => p.$active ?
            p.theme.color.background.accent.secondary.active :
            p.theme.color.background.accent.secondary.rest
        };

        :hover {
            background-color: ${p => p.theme.color.background.accent.secondary.hover};
        }

        :active {
            background-color: ${p => p.theme.color.background.accent.secondary.active};
        }
    `}

    ${p => p.$kind === ButtonKind.Tertiary && css<DefaultButtonSlotWrapperProps>`
        color: ${p => p.theme.color.foreground.text.primary};
        background-color: ${p => p.$active ?
            p.theme.color.background.accent.tertiary.active :
            p.theme.color.background.accent.tertiary.rest
        };

        :hover {
            background-color: ${p => p.theme.color.background.accent.tertiary.hover};
        }

        :active {
            background-color: ${p => p.theme.color.background.accent.tertiary.active};
        }
    `}
`;
