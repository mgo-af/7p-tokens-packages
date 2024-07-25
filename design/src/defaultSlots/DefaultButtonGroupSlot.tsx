import React, { FC, useCallback, useEffect } from "react";
import * as ButtonGroup from "@radix-ui/react-toggle-group";
import styled, { css } from "styled-components";

import { slotSizeToSizeToken } from "./common/helpers";
import { ButtonGroupSlotProps } from "../slots/buttonGroup/types";
import { SlotSize } from "../slots/types";


export const DefaultButtonGroupSlot: FC<ButtonGroupSlotProps> = ({
    items,
    selected,
    size,
    onClick,
    disabled,
    prefix,
    selectable = true,
    prefixVisible = true,
    ...commonProps
}) => {
    const [value, setValue] = React.useState(selected);

    useEffect(() => {
        setValue(selected);
    }, [selected]);

    const onValueChange = useCallback((value: string) => {
        const input = !value ? null : value;

        setValue(input);
        onClick?.(input);
    }, [onClick]);

    return (
        <ButtonGroupRoot
            {...commonProps}
            type="single"
            value={selectable && value}
            onValueChange={onValueChange}
        >
            {
                items.map(x =>
                    <ButtonGroupItem
                        prefix={prefix}
                        $prefixVisible={prefixVisible}
                        $selectable={selectable}
                        key={x.value}
                        value={x.value.toString()}
                        $size={size}
                        disabled={disabled}
                    >
                        {x.text}
                    </ButtonGroupItem>)
            }
        </ButtonGroupRoot>
    );
};

const ButtonGroupRoot = styled(ButtonGroup.Root)`
    display: inline-flex;
    border-radius: ${p => p.theme.radii.s};
`;

type ButtonGroupItemProps = {
    prefix?: string;
    $prefixVisible: boolean;
    $selectable: boolean;
    $size: SlotSize;
};

const ButtonGroupItem = styled(ButtonGroup.Item) <ButtonGroupItemProps>`
    background-color: ${p => p.theme.color.background.surface.secondary};
    color: ${p => p.theme.color.foreground.text.primary};
    font: ${p => p.theme.typography.body.bolder.s};
    height: ${p => slotSizeToSizeToken(p.$size, p.theme)};
    border: 1px solid ${p => p.theme.color.border.layout.subtle};
    padding: ${p => p.theme.spacing.s} ${p => p.theme.spacing.m};
    cursor: pointer;
    
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
        border-top-left-radius: ${p => p.theme.radii.s};
        border-bottom-left-radius: ${p => p.theme.radii.s};
    }

    &:last-child {
        border-top-right-radius: ${p => p.theme.radii.s};
        border-bottom-right-radius: ${p => p.theme.radii.s};
    }

    &:hover {
        background-color: ${p => p.theme.color.background.accent.secondary.hover};
    }

    ${p => p.$selectable && css`
        &:focus {
            background-color: ${p => p.theme.color.background.accent.secondary.active};
        }
    `}

    &[data-state='on'] {
        background-color: ${p => p.theme.color.background.interaction.active};
        border-color: ${p => p.theme.color.background.accent.primary.rest};
    }

    ${p => p.prefix && !p.$prefixVisible && css<ButtonGroupItemProps>`
        padding-left: calc(${p => p.theme.spacing.m} + ${p => p.prefix.length * 0.5}ch);
        padding-right: calc(${p => p.theme.spacing.m} + ${p => p.prefix.length * 0.5}ch);
    `}

    ${p => p.prefix && p.$prefixVisible && css<ButtonGroupItemProps>`
        padding-left: calc(${p => p.theme.spacing.m} + ${p => p.prefix.length}ch);

        &::before {
            content: "";
            display: list-item;
            list-style: "${p => p.prefix}";
        }
    `}
`;
