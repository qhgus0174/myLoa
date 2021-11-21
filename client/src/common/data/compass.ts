interface ICompass {
    ghost: number[];
    chaosGate: number[];
    fieldBoss: number[];
}

export const CompassInfo: ICompass = {
    ghost: [0, 1, 0, 1, 0, 1, 0],
    chaosGate: [1, 0, 0, 1, 0, 1, 1],
    fieldBoss: [0, 1, 0, 0, 1, 0, 1],
};
