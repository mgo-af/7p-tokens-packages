import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";


export const sharedOptionCss = css`
    display: flex;
    align-items: center;
    height: ${p => p.theme.size.m};
    background-color: ${p => p.theme.color.background.accent.secondary.rest};
    border-radius: ${p => p.theme.radii.s};
    color: ${p => p.theme.color.foreground.text.primary};
    font: ${p => p.theme.typography.body.regular.m};
    border: none;
    outline: none;
    cursor: pointer;

    span {
        display: flex;
        gap: ${p => p.theme.spacing.s};
        white-space: nowrap;
    }
`;

export const sharedTriggerCss = css`
    ${sharedOptionCss};

    justify-content: center;
    padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.s};
    border: 1px solid ${p => p.theme.color.border.layout.subtle};

    :hover {
        background-color: ${p => p.theme.color.background.accent.secondary.hover};
    }

    :active,
    :focus {
        background-color: ${p => p.theme.color.background.accent.secondary.active};
    }
`;

export const SelectContent = styled(Select.Content)`
    overflow: hidden;
    padding: ${p => p.theme.spacing.s};
    border-radius: ${p => p.theme.radii.s};
    background-color: ${p => p.theme.color.background.surface.secondary};
    box-shadow: ${p => p.theme.shadow.m};
    z-index: 100;
`;
