import React, { FC, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { InputContainer } from "./common/components/InputContainer";
import { slotSizeToSizeToken } from "./common/helpers";
import { ButtonKind } from "../slots/button/types";
import { IconSlotType } from "../slots/icon/types";
import { TextInputSlotProps } from "../slots/textInput/types";
import { SlotSize } from "../slots/types";
import { DefaultButtonSlot } from "./DefaultButtonSlot";


export const DefaultTextInputSlot: FC<TextInputSlotProps> = ({
    errorProps,
    value,
    onChange,
    label,
    size,
    slotRef,
    "data-testid": dataTestId,
    clearable,
    onClear,
    ...rest
}) => {
    const [inputValue, setInputValue] = useState(value);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const onInternalClear = () => {
        setInputValue("");
        onClear?.();
    };

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <InputContainer
            label={label}
            errorProps={errorProps}
            data-testid={dataTestId}
        >
            <InputWrapper>
                <Input
                    ref={slotRef}
                    value={inputValue}
                    onChange={onValueChange}
                    error={errorProps?.error}
                    type="text"
                    $size={size}
                    {...rest}
                />

                {Boolean(value) && clearable && <ClearableIconButton onClick={onInternalClear} icon={IconSlotType.Close} kind={ButtonKind.Secondary} />}
            </InputWrapper>
        </InputContainer>
    );
};

const ClearableIconButton = styled(DefaultButtonSlot)`
    position: absolute;

    top: 50%;
    right: ${p => p.theme.spacing.xxs};
    
    transform: translateY(-50%);

    z-index: 1;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const Input = styled.input<{ error: boolean; $size: SlotSize; }>`
    width: 100%;
    height: ${p => slotSizeToSizeToken(p.$size, p.theme)};
    padding: ${p => p.theme.spacing.s} ${p => p.theme.spacing.m};
    border-radius: ${p => p.theme.radii.s};
    font: ${p => p.theme.typography.body.bolder.s};
    color: ${p => p.theme.color.foreground.text.primary};
    border: 1px solid ${p => p.theme.color.border.input.rest};
    background-color: ${p => p.theme.color.background.surface.primary};

    ::placeholder { 
        font: ${p => p.theme.typography.body.bolder.s};
        color: ${p => p.theme.color.foreground.text.secondary};
        opacity: 1;
    }

    :hover {
        border: 1px solid ${p => p.theme.color.border.input.hover};
    }

    :active, :focus {
        border: 1px solid ${p => p.theme.color.border.input.active};
    }

    :focus-visible {
        outline: none;
    }

    &:disabled {
        background-color: ${p => p.theme.color.background.accent.disabled.rest};
        border: 1px solid ${p => p.theme.color.border.input.rest};
        color: ${p => p.theme.color.foreground.text.secondary};
    }

    ${p => p.error && css`
       &&&{
            border: 1px solid ${p => p.theme.color.background.danger.primary};
       }
    `}
`;
