export type ColorBlock ={
    id: number;
    amount: string;
    hex: string;
    multiplier:number
}

export type SpinCorner={
    Level:number;
    colorBlock:ColorBlock
}

export type ControlButton = {
    label: string;
    value: number;
};