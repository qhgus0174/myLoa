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
    categoryid: string;
    folder: string;
    filename: string;
    background: BackgroundGrade;
}
