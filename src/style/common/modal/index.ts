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

export const Container = styled.section`
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
`;

export const ContentContainer = styled.article`
    display: flex;
    justify-content: space-around;
    flex-basis: 90%;
    flex-direction: column;

    h3 {
        font-size: 1.05em;
    }

    h4 {
        font-size: 1em;
    }
`;

export const ContentArticle = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;
`;

export const Title = styled.h3`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 0.5em;
    font-weight: 700;
    font-size: 1.02em;
`;

export const Contents = styled.article`
    display: flex;
    align-items: center;
`;

export const ButtonContainer = styled.article`
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

export const InnerContent = styled.article`
    background: ${props => props.theme.colors.mainInner};
    padding: 0.5em;
    border-radius: 1em;
`;
