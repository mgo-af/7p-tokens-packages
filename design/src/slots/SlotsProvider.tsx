import React, { createContext, FC, PropsWithChildren, useMemo } from "react";

import { defaultSlots } from "../defaultSlots";
import { ButtonSlotProps } from "./button";
import { ButtonGroupSlotProps } from "./buttonGroup";
import { CheckboxSlotProps } from "./checkbox";
import { DatePickerSlotProps } from "./datePicker";
import { DialogSlotProps } from "./dialog";
import { IconSlotProps } from "./icon";
import { LoaderSlotProps } from "./loader";
import { MenuButtonSlotProps } from "./menuButton";
import { PopupSlotProps } from "./popup";
import { RadioGroupSlotProps } from "./radioGroup";
import { SearchSlotProps } from "./search";
import { SelectSlotProps } from "./select";
import { TextInputSlotProps } from "./textInput";
import { ToggleSlotProps } from "./toggle";
import { ToggleButtonSlotProps } from "./toggleButton";
import { TooltipSlotProps } from "./tooltip";
import { mergeWithDefaultSlots } from "./utils";


export type Slots = {
    button: FC<ButtonSlotProps>;
    menuButton: FC<MenuButtonSlotProps>;
    icon: FC<IconSlotProps>;
    tooltip: FC<TooltipSlotProps>;
    textInput: FC<TextInputSlotProps>;
    datePicker: FC<DatePickerSlotProps>;
    loader: FC<LoaderSlotProps>;
    toggle: FC<ToggleSlotProps>;
    toggleButton: FC<ToggleButtonSlotProps>;
    buttonGroup: FC<ButtonGroupSlotProps>;
    radioGroup: FC<RadioGroupSlotProps>;
    search: FC<SearchSlotProps>;
    select: FC<SelectSlotProps>;
    checkbox: FC<CheckboxSlotProps>;
    popup: FC<PopupSlotProps>;
    dialog: FC<DialogSlotProps>;
};

export type SlotsProviderProps = PropsWithChildren<{
    slots?: Partial<Slots>;
}>;

export const SlotsContext = createContext(defaultSlots);

export const SlotsProvider: FC<SlotsProviderProps> = ({ children, slots }) => {
    const appSlots = useMemo(() => mergeWithDefaultSlots(slots), [slots]);

    return (
        <SlotsContext.Provider value={appSlots}>
            {children}
        </SlotsContext.Provider>
    );
};
