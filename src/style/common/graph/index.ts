import styled from '@emotion/styled';

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 45%;
    align-items: center;
    margin-top: 2em;
    margin-bottom: 2em;
    height: 100%;

    h3 {
        margin-left: 15px;
    }
`;

export const GraphDiv = styled.div<{ length: number }>`
    display: flex;
    justify-content: center;
    font-size: 0.8em;
    width: 100%;
    height: ${props => props.length > 0 && props.length * 60}px;
    min-height: 300px;
`;
