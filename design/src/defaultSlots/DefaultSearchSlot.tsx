import React, { FC, useEffect, useRef, useState } from "react";
import { useDebounce } from "@7pace/utilities";
import styled from "styled-components";

import { ButtonKind } from "../slots/button/types";
import { IconSlotType } from "../slots/icon/types";
import { SearchSlotProps } from "../slots/search/types";
import { SlotSize } from "../slots/types";
import { DefaultButtonSlot } from "./DefaultButtonSlot";
import { DefaultTextInputSlot } from "./DefaultTextInputSlot";


export const DefaultSearchSlot: FC<SearchSlotProps> = ({
    value,
    debounceRate = 100,
    onChange,
    "data-testid": dataTestId,
    ...rest
}) => {
    const [internalValue, setInternalValue] = useState(value);
    const debouncedValue = useDebounce(internalValue, debounceRate);

    const onChangeRef = useRef(onChange);
    const valueRef = useRef(value);
    onChangeRef.current = onChange;
    valueRef.current = value;

    useEffect(() => {
        if (valueRef.current !== debouncedValue) {
            onChangeRef.current?.(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const onChangeInternal = (newValue: string) => {
        setInternalValue(newValue);
    };

    const onClear = () => {
        setInternalValue("");
        onChange?.("");
    };

    return (
        <DefaultSearchWrapper data-testid={dataTestId}>
            <DefaultTextInputSlot value={internalValue} onChange={onChangeInternal} {...rest} />
            <DefaultButtonSlot
                icon={IconSlotType.Close}
                size={SlotSize.Small}
                kind={ButtonKind.Tertiary}
                onClick={onClear}
            />
        </DefaultSearchWrapper>
    );
};

const DefaultSearchWrapper = styled.div`
    position: relative;
    
    input {
        padding-right: 34px;
    }

    button {
        position: absolute;
        top: 0;
        right: ${p => p.theme.spacing.xs};
        margin: ${p => p.theme.spacing.xs} 0;
        padding: 0 ${p => p.theme.spacing.xs};
    }
`;
