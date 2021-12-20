import React from 'react';
import styled from '@emotion/styled';

const NotFoundPage = () => {
    return <NotFound>페이지를 찾을 수 없습니다.</NotFound>;
};

const NotFound = styled.div`
    width: 80%;
    margin-top: 15em;
    text-align: center;
`;

export default NotFoundPage;
