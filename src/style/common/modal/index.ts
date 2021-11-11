import styled from '@emotion/styled';

export const Dimmer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
`;

export const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
`;

export const FormDivContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-basis: 90%;
    flex-direction: column;
`;

export const ContentsDivTitle = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 0.5em;
    font-weight: 600;
    font-size: 1.01em;
`;

export const ContentsDiv = styled.div`
    display: flex;
    align-items: center;
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

    button:nth-of-type(2) {
        margin-left: 1em;
    }
`;

export const RightButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    button:nth-of-type(2) {
        margin-left: 1em;
    }
`;
