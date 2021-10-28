export const getOwnIdByIndex = (dataArray: any[], ordArray: any[], index: number): number => {
    const id = ordArray[index];
    const resultIndex = dataArray.findIndex((obj: any) => obj.id === id);

    return resultIndex;
};
