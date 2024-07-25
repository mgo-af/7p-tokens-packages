import React, { FC, useCallback, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import styled from "styled-components";

import { ToggleSlotProps } from "../slots/toggle/types";


export const DefaultToggleSlot: FC<ToggleSlotProps> = ({
    value,
    label,
    onToggle,
    className,
    "data-testid": dataTestId,
    ...commonProps
}) => {
    const [checked, setChecked] = useState(value);

    const onCheckedChange = useCallback((v: boolean) => {
        setChecked(v);
        onToggle?.(v);
    }, [onToggle]);

    return (
        <ToggleContainer className={className} data-testid={dataTestId}>
            {label && <ToggleLabel>{label}</ToggleLabel>}
            <ToggleRoot
                {...commonProps}
                checked={checked}
                onCheckedChange={onCheckedChange}
            >
                <Toggle />
            </ToggleRoot>
        </ToggleContainer>
    );
};

const ToggleLabel = styled.span`
    color: ${p => p.theme.color.foreground.text.primary};
    font: ${p => p.theme.typography.body.regular.m};
`;

const ToggleRoot = styled(Switch.Root)`
    position: relative;
    width: 42px;
    height: 24px;
    background-color: ${p => p.theme.color.border.layout.bold};
    border-radius: 9999px;
    border: none;
    padding: 3px;

    &[data-state='checked'] {
        background-color: ${p => p.theme.color.background.accent.primary.rest};
    }

    &:disabled {
        background-color: ${p => p.theme.color.background.surface.disabled};

        &[data-state='checked'] {
            background-color: ${p => p.theme.color.background.interaction.active};
        }
    }

    /* reset */
    button {
        all: unset;
    }
`;

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${p => p.theme.spacing.s};
`;

const Toggle = styled(Switch.Thumb)`
    display: block;
    width: 18px;
    height: 18px;
    background-color: ${p => p.theme.color.background.surface.primary};
    border-radius: 9999px;
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;

    &[data-state='checked'] {
        transform: translateX(16px);
    }
`;
