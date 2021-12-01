import React, { useContext } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { SpinnerContext } from '@context/SpinnerContext';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface ISpinner {
    spinnerVisible: boolean;
}

const Spinner = () => {
    const theme = useTheme();
    const { spinnerVisible } = useContext(SpinnerContext);

    return (
        <LoadingContainer spinnerVisible={spinnerVisible}>
            <SyncLoader color={theme.colors.white} />
        </LoadingContainer>
    );
};

const LoadingContainer = styled.article<ISpinner>`
    display: ${props => (props.spinnerVisible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
`;

export default Spinner;
