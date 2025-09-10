import type { ControlButton, WheelSegment} from "../Utils/types.ts";
import {useEffect, useRef} from "react";


export const wheelData: WheelSegment[] = [
    { type: "number", value: 3000 },
    { type: "text", value: "Zako 2" },
    { type: "number", value: 250 },
    { type: "number", value: 100 },
    { type: "number", value: 7500 },
    { type: "number", value: 2000 },
    { type: "number", value: 150 },
    { type: "number", value: 250 },
    { type: "number", value: 1000 },
    { type: "number", value: 50 },
    { type: "number", value: 2500 },
    { type: "text", value: "Zako 3" },
    { type: "number", value: 150},
    { type: "text", value: "Nunge Tosha" },
    { type: "text", value: "Gonga 25K" },
    { type: "text", value: "SPIN TENA" },
    { type: "number", value: 500 },
    { type: "number", value: 250 },
    { type: "number", value: 1000 },
    { type: "number", value: 50 },
];

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined); // ✅ provide initial value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const controls: ControlButton[] = [
    { label: "20", value: 20 },
    { label: "49", value: 49 },
    { label: "99", value: 99 },
];
