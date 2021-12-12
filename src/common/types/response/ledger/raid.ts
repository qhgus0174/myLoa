export interface IRaidGold {
    id: string;
    name: string;
    openlevel: number;
    closelevel: number;
}

export interface IRaidGoldDetail {
    id: string;
    parentid: string;
    startlevel: number;
    endlevel: number;
    difficulty: string;
    gateway: string;
    gold: number;
}
