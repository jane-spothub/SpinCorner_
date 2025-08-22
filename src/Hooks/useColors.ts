import type {ColorBlock, ControlButton} from "../Utils/types.ts";
import {useEffect, useRef} from "react";

export const colorLevels: Record<number, ColorBlock[]> = {
    99: [
        { id: 17, amount: "Zako 3", hex: "gradient-pink-black",multiplier:1.4},
        { id: 6, amount: "1000", hex: "gradient-blue",multiplier:2.7},
        { id: 7, amount: "500", hex: "gradient-dark-red",multiplier:2.6},
        { id: 8, amount: "250", hex: "gradient-pink-black",multiplier:2.5},
        { id: 9, amount: "250", hex: "rgb(90,32,67)",multiplier:2.3},
        { id: 1, amount: "Gonga 25K", hex: "gradient-yellow",multiplier:2.98},
        { id: 10, amount: "250", hex: "gradient-pink-black",multiplier:2.2},
        { id: 11, amount: "200", hex: "gradient-dark-green",multiplier:2.1},
        { id: 5, amount: "1000", hex: "gradient-pink-black",multiplier:2.8},
        { id: 4, amount: "2500", hex: "gradient-yellow",multiplier:2.8},
        { id: 12, amount: "150", hex: "gradient-blue",multiplier:1.9},
        { id: 19, amount: "SPIN TENA", hex: "gradient-dark-red",multiplier:1.2},
        { id: 13, amount: "150", hex: "gradient-dark-green",multiplier:1.8},
        { id: 2, amount: "7500", hex: "gradient-pink-black",multiplier:2.95},
        { id: 3, amount: "3000", hex: "gradient-dark-red",multiplier:2.9},
        { id: 14, amount: "100", hex: "gradient-pink-black",multiplier:1.7},
        { id: 18, amount: "Zako 2", hex: "gradient-dark-purple-blue",multiplier:1.3},
        { id: 15, amount: "50", hex: "gradient-dark-red",multiplier:1.6},
        { id: 16, amount: "50", hex: "gradient-yellow",multiplier:1.5},
        { id: 20, amount: "Nunge Tosha", hex: "gradient-dark-green",multiplier:1.1}
    ],
    49:[
        { id: 5, amount: "500", hex:"gradient-pink-black",multiplier:2.8},
        { id: 20, amount: "Nunge Tosha", hex: "gradient-dark-green",multiplier:1.1},

        { id: 6, amount: "500", hex: "gradient-blue",multiplier:2.7},
        { id: 7, amount: "250", hex: "gradient-dark-red",multiplier:2.6},
        { id: 1, amount: "Gonga 10K", hex: "gradient-yellow",multiplier:2.98},

        { id: 8, amount: "125", hex: "gradient-pink-black",multiplier:2.5},
        { id: 9, amount: "125", hex: "rgb(90,32,67)",multiplier:2.3},
        { id: 10, amount: "125", hex: "gradient-pink-black",multiplier:2.2},
        { id: 18, amount: "Zako 2", hex: "gradient-dark-purple-blue",multiplier:1.3},
        { id: 11, amount: "100", hex: "gradient-dark-green",multiplier:2.1},
        { id: 4, amount: "1000", hex:  "gradient-yellow",multiplier:2.8},

        { id: 2, amount: "3500", hex: "gradient-pink-black",multiplier:2.95},

        { id: 12, amount: "75", hex: "gradient-blue",multiplier:1.9},
        { id: 3, amount: "1500", hex: "gradient-dark-red",multiplier:2.9},

        { id: 17, amount: "Zako 3", hex:"gradient-pink-black",multiplier:1.4},
        { id: 13, amount: "75", hex: "gradient-dark-green",multiplier:1.8},
        { id: 14, amount: "50", hex: "gradient-pink-black",multiplier:1.7},
        { id: 15, amount: "25", hex: "gradient-dark-red",multiplier:1.6},
        { id: 16, amount: "25", hex: "gradient-yellow",multiplier:1.5},
        { id: 19, amount: "SPIN TENA", hex: "gradient-dark-red",multiplier:1.2},
    ],
    20:[
        { id: 20, amount: "Nunge Tosha", hex: "gradient-dark-green",multiplier:1.1},
        { id: 3, amount: "750", hex: "gradient-dark-red",multiplier:2.9},
        { id: 5, amount: "250", hex: "gradient-pink-black",multiplier:2.8},

        { id: 6, amount: "250", hex: "gradient-dark-red-light",multiplier:2.7},
        { id: 7, amount: "125", hex: "gradient-dark-red",multiplier:2.6},
        { id: 17, amount: "Zako 3", hex: "gradient-pink-black",multiplier:1.4},

        { id: 1, amount: "Gonga 3K", hex: "gradient-yellow",multiplier:2.98},

        { id: 8, amount: "50", hex: "gradient-pink-black",multiplier:2.5},
        { id: 9, amount: "50", hex: "rgb(90,32,67)",multiplier:2.3},
        { id: 10, amount: "50", hex: "gradient-pink-black",multiplier:2.2},
        { id: 11, amount: "30", hex: "gradient-dark-green",multiplier:2.1},
        { id: 4, amount: "500", hex: "gradient-dark-red",multiplier:2.8},

        { id: 12, amount: "15", hex: "gradient-blue",multiplier:1.9},
        { id: 13, amount: "15", hex: "gradient-dark-green",multiplier:1.8},
        { id: 2, amount: "1500", hex: "gradient-pink-black",multiplier:2.95},
        { id: 15, amount: "5", hex:  "gradient-yellow",multiplier:1.6},

        { id: 19, amount: "SPIN TENA", hex: "gradient-dark-red",multiplier:1.2},

        { id: 14, amount: "10", hex: "gradient-pink-black",multiplier:1.7},
        { id: 16, amount: "55", hex: "gradient-yellow",multiplier:1.5},
        { id: 18, amount: "Zako 2", hex: "gradient-dark-purple-blue",multiplier:1.3},
    ]
}

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined); // ✅ provide initial value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const controls: ControlButton[] = [
    { label: "99", value: 99 },
    { label: "49", value: 49 },
    { label: "20", value: 20 },
];
