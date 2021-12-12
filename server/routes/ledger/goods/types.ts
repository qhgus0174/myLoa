import { BackgroundGrade } from '@style/common/img';

export interface IGoods {
    id: string;
    name: string;
    defaultimgurl: string;
    engname: string;
    defaultbackground: BackgroundGrade;
}

export interface IGoodsImg {
    id: string;
    folder: string;
    categoryid: string;
    filename: string;
    background: BackgroundGrade;
}
