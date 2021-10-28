import LineEdit from '@components/Line/LineEdit';
import React from 'react';
import { ITodo } from '../TodoType';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, modal: JSX.Element, width?: string, height?: string) => void;
}) => {
    return (
        <div onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onContextMenu(e, <LineEdit {...todo} />)}>
            구분선
        </div>
    );
};

export default Line;
