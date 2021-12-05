export interface IGuardian {
    step: string;
    stepName: string;
    list: INameValue[];
}

interface INameValue {
    value: string;
    name: string;
}

export const GuardianInfo: IGuardian[] = [
    {
        step: '1',
        stepName: '토벌 1단계',
        list: [
            { value: '1', name: '우르닐' },
            { value: '2', name: '루메루스' },
            { value: '3', name: '빙결의 레기오로스' },
            { value: '4', name: '베르투스' },
        ],
    },
    {
        step: '2',
        stepName: '토벌 2단계',
        list: [
            { value: '1', name: '크로마니움' },
            { value: '2', name: '나크라세나' },
            { value: '3', name: '홍염의 요호' },
            { value: '4', name: '타이탈로스' },
        ],
    },
    {
        step: '3',
        stepName: '토벌 3단계',
        list: [
            { value: '1', name: '어둠의 레기오로스' },
            { value: '2', name: '헬가이아' },
            { value: '3', name: '칼벤투스' },
            { value: '4', name: '아카테스' },
        ],
    },
    {
        step: '4',
        stepName: '토벌 4단계',
        list: [
            { value: '1', name: '혹한의 헬가이아' },
            { value: '2', name: '용암 크로마니움' },
            { value: '3', name: '레바노스' },
            { value: '4', name: '엘버하스틱' },
        ],
    },
    {
        step: '5',
        stepName: '토벌 5단계',
        list: [
            { value: '1', name: '중갑 나크라세나' },
            { value: '2', name: '이그렉시온' },
            { value: '3', name: '흑야의 요호' },
            { value: '4', name: '벨가누스' },
        ],
    },
    {
        step: '6',
        stepName: '토벌 6단계',
        list: [
            { value: '1', name: '데스칼루다' },
            { value: '2', name: '쿤겔라니움' },
            { value: '3', name: '칼엘리고스' },
            { value: '4', name: '하누마탄' },
        ],
    },
];
