import React from 'react';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Manage = () => {
    return (
        <ManageContainer>
            <span>오류 발생 시 데이터를 초기화 할 수 있습니다. 👉</span>
            <Button onClick={() => localStorage.clear()}>초기화</Button>
        </ManageContainer>
    );
};

const ManageContainer = styled(FlexDiv)`
    width: 70%;
    justify-content: center;
    align-items: center;
    height: 50vh;
    margin-top: 3em;
    margin-bottom: 3em;
    box-sizing: border-box;
`;

export default Manage;
