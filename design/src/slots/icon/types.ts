import { DefaultSlotProps, SlotSize } from "../types";


export enum IconSlotType {
    ArrowUp,
    ArrowDown,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    ChevronDoubleDown,
    Comment,
    Plus,
    Pen,
    QuestionCircle,
    Bin,
    Copy,
    TimeFrame,
    Stack,
    Calendar,
    Drag,
    Close,
    Export,
    Gift,
    Group,
    Sort,
    Settings,
    Expand,
    School,
    Envelope,
    Rocket,
    Lightbulb,
    Minus,
    Filter,
    ZoomIn,
    ZoomOut,
    Import,
    Undo,
    ExternalLink,
    Check,
    Warning
}

export type IconSlotProps = Pick<DefaultSlotProps, "className" | "data-testid"> & {
    type: IconSlotType;
    size: SlotSize;
};
