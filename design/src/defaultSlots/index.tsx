import { DefaultIconSlot } from "./DefaultIconSlot/DefaultIconSlot";
import { DefaultPopupSlot } from "./DefaultPopupSlot/DefaultPopupSlot";
import { Slots } from "../slots";
import { DefaultButtonGroupSlot } from "./DefaultButtonGroupSlot";
import { DefaultButtonSlot } from "./DefaultButtonSlot";
import { DefaultCheckboxSlot } from "./DefaultCheckboxSlot";
import { DefaultDatePickerSlot } from "./DefaultDatePickerSlot";
import { DefaultDialogSlot } from "./DefaultDialogSlot";
import { DefaultLoaderSlot } from "./DefaultLoaderSlot";
import { DefaultMenuButtonSlot } from "./DefaultMenuButtonSlot";
import { DefaultRadioGroupSlot } from "./DefaultRadioGroupSlot";
import { DefaultSearchSlot } from "./DefaultSearchSlot";
import { DefaultSelectSlot } from "./DefaultSelectSlot";
import { DefaultTextInputSlot } from "./DefaultTextInputSlot";
import { DefaultToggleButtonSlot } from "./DefaultToggleButtonSlot";
import { DefaultToggleSlot } from "./DefaultToggleSlot";
import { DefaultTooltipSlot } from "./DefaultTooltipSlot";


export * from "./DefaultButtonGroupSlot";
export * from "./DefaultButtonSlot";
export * from "./DefaultCheckboxSlot";
export * from "./DefaultDatePickerSlot";
export * from "./DefaultIconSlot/DefaultIconSlot";
export * from "./DefaultLoaderSlot";
export * from "./DefaultMenuButtonSlot";
export * from "./DefaultPopupSlot/DefaultPopupSlot";
export * from "./DefaultSearchSlot";
export * from "./DefaultSelectSlot";
export * from "./DefaultTextInputSlot";
export * from "./DefaultToggleButtonSlot";
export * from "./DefaultToggleSlot";
export * from "./DefaultTooltipSlot";

export const defaultSlots: Slots = {
    button: DefaultButtonSlot,
    menuButton: DefaultMenuButtonSlot,
    icon: DefaultIconSlot,
    tooltip: DefaultTooltipSlot,
    textInput: DefaultTextInputSlot,
    datePicker: DefaultDatePickerSlot,
    loader: DefaultLoaderSlot,
    toggle: DefaultToggleSlot,
    toggleButton: DefaultToggleButtonSlot,
    buttonGroup: DefaultButtonGroupSlot,
    radioGroup: DefaultRadioGroupSlot,
    search: DefaultSearchSlot,
    select: DefaultSelectSlot,
    checkbox: DefaultCheckboxSlot,
    popup: DefaultPopupSlot,
    dialog: DefaultDialogSlot
};
