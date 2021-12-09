export interface IRaidGold {
    id: string;
    name: string;
}

export interface IRaidGoldDetail {
    id: string;
    parentId: string;
    level: number;
    difficulty: string;
    gateway: string;
    gold: number;
}
