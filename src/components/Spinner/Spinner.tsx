import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import PuffLoader from 'react-spinners/BeatLoader';
import { SpinnerContext } from '@context/SpinnerContext';

interface ISpinner {
    spinnerVisible: boolean;
}

const Spinner = () => {
    const theme = useTheme();
    const { spinnerVisible } = useContext(SpinnerContext);

    return (
        <LoadingContainer spinnerVisible={spinnerVisible}>
            <PuffLoader />
        </LoadingContainer>
    );
};

const LoadingContainer = styled.div<ISpinner>`
    display: ${props => (props.spinnerVisible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
`;

export default Spinner;
