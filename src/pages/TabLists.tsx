import React from 'react';
import { Tab, TabList } from 'react-tabs';
import { css } from '@emotion/react';

const TabLists = () => {
    return (
        <TabList
            role="tablist"
            css={css`
                display: flex;
                justify-content: center;
                & > li {
                    cursor: pointer;
                    padding-top: 1em;
                    padding-bottom: 1em;
                    padding-right: 3em;
                    padding-left: 3em;
                    margin-top: 1em;
                    margin-bottom: 1em;
                    border: 1px solid;
                }
            `}
        >
            <Tab selected={true} role="tab">
                원정대 공유
            </Tab>
            <Tab role="tab">일일 / 주간 컨텐츠</Tab>
        </TabList>
    );
};

export default TabLists;
