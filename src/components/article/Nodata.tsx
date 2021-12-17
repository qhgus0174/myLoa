import React from 'react';
import styled from '@emotion/styled';

const Nodata = ({ text }: { text: string | JSX.Element }) => {
    return (
        <NoDataContainer>
            <span>{text}</span>
        </NoDataContainer>
    );
};

const NoDataContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 4em;
    margin-bottom: 4em;
    text-align: center;

    span,
    p,
    strong {
        color: ${props => props.theme.colors.warn};
    }
`;
export default Nodata;
