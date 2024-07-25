import React, { FC, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled, { css } from "styled-components";

import { ButtonKind } from "../slots/button/types";
import { DialogSlotProps } from "../slots/dialog/types";
import { IconSlotType } from "../slots/icon/types";
import { SlotSize } from "../slots/types";
import { DefaultButtonSlot } from "./DefaultButtonSlot";


export const DefaultDialogSlot: FC<DialogSlotProps> = ({
    isOpen,
    title,
    width,
    showCloseButton = false,
    closeOnClickOutside = true,
    children,
    onClose,
    ...rest
}) => {
    const [isOpenInternal, setIsOpenInternal] = useState(isOpen);

    useEffect(() => {
        setIsOpenInternal(isOpen);
    }, [isOpen]);

    const onCloseInternal = () => {
        setIsOpenInternal(false);
        onClose?.();
    };

    const onEscapeKeyDown = () => {
        onCloseInternal();
    };

    const onInteractOutside = () => {
        if (closeOnClickOutside) {
            onCloseInternal();
        }
    };

    return (
        <Dialog.Root open={isOpenInternal}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent
                    $width={width}
                    onEscapeKeyDown={onEscapeKeyDown}
                    onInteractOutside={onInteractOutside}
                    {...rest}
                >
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {children}
                    {showCloseButton &&
                        <DialogClose asChild>
                            <DefaultButtonSlot
                                kind={ButtonKind.Tertiary}
                                size={SlotSize.Small}
                                icon={IconSlotType.Close}
                                onClick={onCloseInternal}
                            />
                        </DialogClose>
                    }
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
};


const DialogOverlay = styled(Dialog.Overlay)`
    background-color: ${p => p.theme.color.background.surface.contrastInverted};
    position: fixed;
    inset: 0;
    z-index: 998;
    animation: overlayShow .3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: .3;
        }
    }
`;

const DialogContent = styled(Dialog.Content) <{ $width: number; }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${p => p.theme.spacing.m};
    color: ${p => p.theme.color.foreground.text.primary};
    background-color: ${p => p.theme.color.background.surface.primary};
    border-radius: ${p => p.theme.radii.m};
    box-shadow: ${p => p.theme.shadow.s};
    z-index: 999;
    animation: contentShow .3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

    ${p => p.$width != null && css`
        width: ${p.$width}px;
    `}

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const DialogTitle = styled(Dialog.Title)`
    margin-top: 0;
    font: ${p => p.theme.typography.title.m};
`;

const DialogClose = styled(Dialog.Close)`
    position: absolute;
    top: ${p => p.theme.spacing.s};
    right: ${p => p.theme.spacing.s};
`;
