import styled from '@emotion/styled';

export const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    height: 100%;
    flex-direction: column;
`;

export const FormDivContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-basis: 90%;
    flex-direction: column;
`;

export const ContentsDivTitle = styled.div`
    display: flex;
    flex-basis: 50%;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 0.5em;
    font-weight: 600;
`;

export const ContentsDiv = styled.div`
    display: flex;
    align-items: center;
    flex-basis: 50%;
`;

export const FormButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 10%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 1.4em;
    padding-bottom: 1em;

    button:nth-child(2) {
        margin-left: 1em;
    }
`;

export const RightButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    button:nth-child(2) {
        margin-left: 1em;
    }
`;
