import { defaultSlots } from "../defaultSlots";
import { Slots } from "./SlotsProvider";


export const mergeWithDefaultSlots = (appSlots?: Partial<Slots>): Slots => {
    if (!appSlots || !Object.keys(appSlots).length) {
        return defaultSlots;
    }

    const res: Partial<Slots> = {};

    for (const [key, defaultSlot] of Object.entries(defaultSlots)) {
        res[key] = appSlots[key] ?? defaultSlot;
    }

    return res as Slots;
};
