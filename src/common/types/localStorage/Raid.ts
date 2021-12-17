export interface IRaid {
    id: number;
    name: string;
    imgurl: string;
    color: string;
    showCharacter: number[];
    character: IRaidCharacter[];
}

export interface IRaidCharacter {
    id: number;
    check: number;
}
