import React, { forwardRef, PropsWithChildren } from "react";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

import { MenuButtonOption } from "../../../slots/menuButton/types";
import { sharedOptionCss } from "../styles";



type SelectItemProps = PropsWithChildren<{
    option: MenuButtonOption;
    className?: string;
}>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, option }, forwardedRef) => {
    return (
        <SelectItemWrapper value={option.value} className={className} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
        </SelectItemWrapper>
    );
});

const SelectItemWrapper = styled(Select.Item)`
    ${sharedOptionCss};
    padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.l};

    :hover {
        background-color: ${p => p.theme.color.background.accent.secondary.hover};
        border: none;
        outline: none;
    }
`;
