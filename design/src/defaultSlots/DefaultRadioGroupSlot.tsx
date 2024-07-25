import React, { FC, useCallback, useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "styled-components";

import { RadioGroupSlotProps } from "../slots/radioGroup";


export const DefaultRadioGroupSlot: FC<RadioGroupSlotProps> = ({
    items,
    selected,
    onSelect,
    ...commonProps
}) => {
    const [itemsInternal, setItemsInternal] = useState(items);

    useEffect(() => {
        setItemsInternal(items);
    }, [items]);

    const onSelectInternal = useCallback((value: string) => {
        onSelect?.(value);
    }, [onSelect]);

    return (
        <RadioGroupRoot
            {...commonProps}
            value={selected}
            onValueChange={onSelectInternal}
        >
            {itemsInternal?.map((item) => (
                <RadioGroupItemContainer key={item.value}>
                    <RadioGroupItem key={item.value} value={item.value}>
                        <RadioGroupIndicator />
                    </RadioGroupItem>
                    <RadioGroupItemLabel>
                        {item.text}
                    </RadioGroupItemLabel>
                </RadioGroupItemContainer>
            ))}
        </RadioGroupRoot>
    );
};

const RadioGroupRoot = styled(RadioGroup.Root)`
    display: flex;
    flex-direction: ${p => p.orientation === "vertical" ? "column" : "row"};
    gap: ${p => p.theme.spacing.m};
`;

const RadioGroupItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${p => p.theme.spacing.s};
`;

const RadioGroupItem = styled(RadioGroup.Item)`
    all: unset;
    width: ${p => p.theme.size.xs};
    height: ${p => p.theme.size.xs};
    border: 1px solid ${p => p.theme.color.border.input.rest};
    border-radius: ${p => p.theme.radii.circular};
    background-color: ${p => p.theme.color.background.surface.primary};
    cursor: pointer;

    :hover {
        border-color: ${p => p.theme.color.border.input.hover};
    }

    :active {
        border-color: ${p => p.theme.color.border.input.active};
    }

    :focus {
        border-color: ${p => p.theme.color.border.input.focus};
    }
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    ::after {
        content: '';
        display: block;
        width: calc(${p => p.theme.size.xs} / 2);
        height: calc(${p => p.theme.size.xs} / 2);
        border-radius: ${p => p.theme.radii.circular};
        background-color: ${p => p.theme.color.background.accent.primary.rest};
    }
`;

const RadioGroupItemLabel = styled.span`
    color: ${p => p.theme.color.foreground.text.primary};
    font: ${p => p.theme.typography.body.regular.m};
`;
