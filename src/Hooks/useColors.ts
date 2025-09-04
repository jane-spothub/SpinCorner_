import type {ColorBlock, ControlButton} from "../Utils/types.ts";
import {useEffect, useRef} from "react";

// Define your constant color blocks
export const constantColorBlocks: ColorBlock[] = [
    { id: 3, amount: "3000", hex: "faded-yellow", multiplier: 2.9 },
    { id: 18, amount: "Zako 2", hex: "green-c", multiplier: 1.3 },
    { id: 10, amount: "250", hex: "purple-c", multiplier: 2.2 },
    { id: 14, amount: "100", hex: "red-c", multiplier: 1.7 },
    { id: 2, amount: "7500", hex: "faded-yellow", multiplier: 2.95 },
    { id: 21, amount: "2000", hex: "green-c", multiplier: 2.9 },
    { id: 12, amount: "150", hex: "purple-c", multiplier: 1.9 },
    { id: 8, amount: "250", hex: "yellow-c", multiplier: 2.5 },
    { id: 5, amount: "1000", hex: "royal-blue-c", multiplier: 2.8 },
    { id: 15, amount: "50", hex: "red-c", multiplier: 1.6 },
    { id: 4, amount: "2500", hex: "faded-yellow", multiplier: 2.8 },
    { id: 17, amount: "Zako 3", hex: "green-c", multiplier: 1.4 },
    { id: 13, amount: "150", hex: "purple-c", multiplier: 1.8 },
    { id: 20, amount: "Nunge Tosha", hex: "red-c", multiplier: 1.1 },
    { id: 1, amount: "Gonga 25K", hex: "faded-yellow", multiplier: 2.98 },
    { id: 19, amount: "SPIN TENA", hex: "green-c", multiplier: 1.2 },
    { id: 7, amount: "500", hex: "purple-c", multiplier: 2.6 },
    { id: 9, amount: "250", hex: "yellow-c", multiplier: 2.3 },
    { id: 6, amount: "1000", hex: "royal-blue-c", multiplier: 2.7 },
    { id: 16, amount: "50", hex: "red-c", multiplier: 1.5 }
];

// export const colorLevels: Record<number, ColorBlock[]> = {
//     99: [
//
//
//         { id: 3, amount: "3000", hex: "faded-yellow",multiplier:2.9},
//         { id: 18, amount: "Zako 2", hex: "green-c",multiplier:1.3},
//         { id: 10, amount: "250", hex: "purple-c",multiplier:2.2},
//         { id: 14, amount: "100", hex: "red-c",multiplier:1.7},
//         { id: 2, amount: "7500", hex: "faded-yellow",multiplier:2.95},
//         { id: 21, amount: "2000", hex: "green-c",multiplier:2.9},
//         { id: 12, amount: "150", hex: "purple-c",multiplier:1.9},
//         { id: 8, amount: "250", hex: "yellow-c",multiplier:2.5},
//         { id: 5, amount: "1000", hex: "royal-blue-c",multiplier:2.8},
//         { id: 15, amount: "50", hex: "red-c",multiplier:1.6},
//         { id: 4, amount: "2500", hex: "faded-yellow",multiplier:2.8},
//         { id: 17, amount: "Zako 3", hex: "green-c",multiplier:1.4},
//         { id: 13, amount: "150", hex: "purple-c",multiplier:1.8},
//         { id: 20, amount: "Nunge Tosha", hex: "red-c",multiplier:1.1},
//         { id: 1, amount: "Gonga 25K", hex: "faded-yellow",multiplier:2.98},
//         { id: 19, amount: "SPIN TENA", hex: "green-c",multiplier:1.2},
//         { id: 7, amount: "500", hex: "purple-c",multiplier:2.6},
//         { id: 9, amount: "250", hex: "yellow-c",multiplier:2.3},
//         { id: 6, amount: "1000", hex: "royal-blue-c",multiplier:2.7},
//         { id: 16, amount: "50", hex: "red-c",multiplier:1.5},
//
//
//     ],
//     49:[
//         { id: 5, amount: "500", hex:"purple-c",multiplier:2.8},
//         { id: 11, amount: "100", hex: "red-c",multiplier:2.1},
//         { id: 10, amount: "125", hex: "faded-yellow",multiplier:2.2},
//
//         { id: 12, amount: "75", hex: "red-c",multiplier:1.9},
//         { id: 7, amount: "250", hex: "yellow-c",multiplier:2.6},
//         { id: 17, amount: "Zako 3", hex:"green-c",multiplier:1.4},
//
//         { id: 4, amount: "1000", hex:  "royal-blue-c",multiplier:2.8},
//         { id: 1, amount: "Gonga 10K", hex: "faded-yellow",multiplier:2.98},
//         { id: 16, amount: "25", hex: "red-c",multiplier:1.5},
//         { id: 9, amount: "125", hex: "faded-yellow",multiplier:2.3},
//         { id: 18, amount: "Zako 2", hex: "green-c",multiplier:1.3},
//         { id: 14, amount: "50", hex: "yellow-c",multiplier:1.7},
//         { id: 6, amount: "500", hex: "purple-c",multiplier:2.7},
//         { id: 2, amount: "3500", hex: "faded-yellow",multiplier:2.95},
//         { id: 3, amount: "1500", hex: "royal-blue-c",multiplier:2.9},
//         { id: 20, amount: "Nunge Tosha", hex: "red-c",multiplier:1.1},
//         { id: 13, amount: "75", hex: "yellow-c",multiplier:1.8},
//         { id: 15, amount: "25", hex: "faded-yellow",multiplier:1.6},
//
//         { id: 19, amount: "SPIN TENA", hex: "green-c",multiplier:1.2},
//
//     ],
//     20:[
//         { id: 7, amount: "125", hex: "faded-yellow",multiplier:2.6},
//         { id: 20, amount: "Nunge Tosha", hex: "red-c",multiplier:1.1},
//         { id: 11, amount: "30", hex: "royal-blue-c",multiplier:2.1},
//         { id: 5, amount: "250", hex: "yellow-c",multiplier:2.8},
//         { id: 9, amount: "50", hex: "red-c",multiplier:2.3},
//         { id: 3, amount: "750", hex: "faded-yellow",multiplier:2.9},
//         { id: 13, amount: "15", hex: "yellow-c",multiplier:1.8},
//         { id: 17, amount: "Zako 3", hex: "green-c",multiplier:1.4},
//         { id: 8, amount: "50", hex: "red-c",multiplier:2.5},
//         { id: 1, amount: "Gonga 3K", hex: "faded-yellow",multiplier:2.98},
//         { id: 4, amount: "500", hex: "purple-c",multiplier:2.8},
//         { id: 12, amount: "15", hex: "yellow-c",multiplier:1.9},
//         { id: 2, amount: "1500", hex: "royal-blue-c",multiplier:2.95},
//         { id: 15, amount: "5", hex:  "red-c",multiplier:1.6},
//         { id: 16, amount: "55", hex: "faded-yellow",multiplier:1.5},
//         { id: 19, amount: "SPIN TENA", hex: "green-c",multiplier:1.2},
//         { id: 14, amount: "10", hex: "royal-blue-c",multiplier:1.7},
//         { id: 10, amount: "50", hex: "red-c",multiplier:2.2},
//         { id: 6, amount: "250", hex: "yellow-c",multiplier:2.7},
//
//         { id: 18, amount: "Zako 2", hex: "green-c",multiplier:1.3},
//     ]
// }

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
