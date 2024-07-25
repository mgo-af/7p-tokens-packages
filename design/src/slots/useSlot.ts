import { useContext } from "react";

import { Slots, SlotsContext } from "./SlotsProvider";


export const useSlot = <T extends keyof Slots>(slotType: T): Slots[T] => {
    const slots = useContext(SlotsContext);
    if (!slots) {
        return null;
    }

    return slots[slotType];
};
