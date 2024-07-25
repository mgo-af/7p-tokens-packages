import React, { FC, useEffect, useId, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import styled from "styled-components";

import { CheckboxSlotProps } from "../slots/checkbox/types";


export const DefaultCheckboxSlot: FC<CheckboxSlotProps> = ({
    checked,
    label,
    onChange,
    ...rest
}) => {
    const checkBoxId = useId();
    const [checkedInternal, setCheckedInternal] = useState(checked);

    useEffect(() => {
        setCheckedInternal(checked);
    }, [checked]);

    const onChangeInternal = (value: boolean) => {
        setCheckedInternal(value);
        onChange?.(value);
    };

    return (
        <CheckboxWrapper>
            <CheckboxRoot onCheckedChange={onChangeInternal} checked={checkedInternal} {...rest}>
                <Checkbox.Indicator id={checkBoxId}>
                    <CheckboxIcon className="las la-check" />
                </Checkbox.Indicator>
            </CheckboxRoot>
            <label htmlFor={checkBoxId}>
                {label}
            </label>
        </CheckboxWrapper>
    );
};

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${p => p.theme.spacing.s};
    color: ${p => p.theme.color.foreground.text.primary};
`;

const CheckboxRoot = styled(Checkbox.Root)`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: ${p => p.theme.radii.s};
    background-color: transparent;
    border: 1px solid ${p => p.theme.color.border.input.rest};
    cursor: pointer;

    &[data-state="checked"] {
        color: ${p => p.theme.color.foreground.text.contrast};
        background-color: ${p => p.theme.color.background.accent.primary.rest};
        border-color: ${p => p.theme.color.background.accent.primary.rest};
    }

    &[data-disabled] {
        color: ${p => p.theme.color.foreground.text.primary};
        background-color: ${p => p.theme.color.background.accent.disabled.rest};
        border-color: ${p => p.theme.color.background.accent.disabled.rest};
    }

    :hover {
        border-color: ${p => p.theme.color.border.input.hover};
    }

    :focus {
        border-color: ${p => p.theme.color.border.input.focus};
    }
`;

const CheckboxIcon = styled.i`
    transform: scale(0.8);
`;
