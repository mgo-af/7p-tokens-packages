import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

import { SelectItem } from "./common/components/DefaultOptionItem";
import { SelectContent, sharedTriggerCss } from "./common/styles";
import { DefaultIconSlot } from "./DefaultIconSlot/DefaultIconSlot";
import { IconSlotType } from "../slots/icon/types";
import { SelectSlotProps } from "../slots/select/types";
import { SlotSize } from "../slots/types";


export const DefaultSelectSlot: FC<SelectSlotProps> = ({
    options,
    selected,
    placeholder,
    disabled,
    size = SlotSize.Medium,
    onChange,
    ...rest
}) => {
    const onChangeInternal = (value: string) => {
        const newOption = options.find((cur) => cur.value === value);
        onChange?.([newOption]);
    };

    return (
        <Wrapper onValueChange={onChangeInternal} defaultValue={selected?.[0]?.value} disabled={disabled}>
            <Trigger {...rest}>
                <Select.Value placeholder={placeholder} />
                <Icon>
                    <DefaultIconSlot type={IconSlotType.ChevronDown} size={size} />
                </Icon>
            </Trigger>
            <Select.Portal>
                <SelectContent position="popper" side="bottom" sideOffset={6}>
                    <Select.Viewport>
                        {options?.map((option) =>
                            <SelectItem key={option.value} option={option}>
                                {option.icon && <DefaultIconSlot size={size} type={option.icon} />}
                                <div>{option?.text}</div>
                            </SelectItem>)}
                    </Select.Viewport>
                </SelectContent>
            </Select.Portal>
        </Wrapper>
    );
};

const Wrapper = styled(Select.Root)`
    button {
        all: unset;
    }
`;

const Trigger = styled(Select.Trigger)`
    ${sharedTriggerCss};
    width: 100%;
`;

const Icon = styled(Select.Icon)`
    margin-left: ${p => p.theme.spacing.s};
`;
