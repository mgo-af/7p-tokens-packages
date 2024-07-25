import React, { FC } from "react";
import styled from "styled-components";

import { DefaultSlotProps, ErrorProps } from "../../../slots/types";


type InputContainerProps = Pick<DefaultSlotProps, "className" | "data-testid"> & {
    label?: string;
    errorProps?: ErrorProps;
};

export const InputContainer: FC<React.PropsWithChildren<InputContainerProps>> = ({
    children,
    label,
    errorProps,
    ...rest
}) => {
    return (
        <InputContainerStyled {...rest}>
            {label && <Label>{label}</Label>}
            {children}
            {errorProps?.error && errorProps?.message && <ErrorMessage>{errorProps.message}</ErrorMessage>}
        </InputContainerStyled>
    );
};

const InputContainerStyled = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
`;

const Label = styled.span`
    display: inline-block;
    color: ${p => p.theme.color.foreground.text.primary};
    font: ${p => p.theme.typography.body.regular.m};
    margin-bottom: ${p => p.theme.spacing.xs};
`;

const ErrorMessage = styled.span`
    font: ${p => p.theme.typography.caption.s};
    color: ${p => p.theme.color.background.danger.primary};
    margin-top: ${p => p.theme.spacing.xs};
`;
