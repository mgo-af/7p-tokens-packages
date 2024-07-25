import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

import { SelectItem } from "./common/components/DefaultOptionItem";
import { sharedTriggerCss } from "./common/styles";
import { DefaultIconSlot } from "./DefaultIconSlot/DefaultIconSlot";
import { MenuButtonSlotProps } from "../slots/menuButton/types";
import { SlotSize } from "../slots/types";


export const DefaultMenuButtonSlot: FC<MenuButtonSlotProps> = ({
    options,
    selected,
    placeholder,
    itemClassName,
    calloutClassName,
    disabled,
    onChange,
    ...rest
}) => {
    const onChangeInternal = (value: string) => {
        onChange?.(options.find((cur) => cur.value === value));
    };

    return (
        <Wrapper onValueChange={onChangeInternal} defaultValue={selected?.value} disabled={disabled}>
            <Trigger {...rest}>
                <Select.Value placeholder={placeholder ?? "Select"} />
            </Trigger>
            <Select.Portal>
                <Content position="popper" side="bottom" className={calloutClassName} sideOffset={6}>
                    <Select.Viewport>
                        {options?.map((option) =>
                            <SelectItem key={option.value} option={option} className={itemClassName}>
                                {option.icon && <DefaultIconSlot size={SlotSize.Medium} type={option.icon} />}
                                <div>{option?.text}</div>
                            </SelectItem>)}
                    </Select.Viewport>
                </Content>
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
`;

const Content = styled(Select.Content)`
    overflow: hidden;
    padding: ${p => p.theme.spacing.s};
    border-radius: ${p => p.theme.radii.s};
    background-color: ${p => p.theme.color.background.surface.secondary};
    box-shadow: ${p => p.theme.shadow.m};
    z-index: 100;
`;
