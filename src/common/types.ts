import React, { ReactElement } from 'react';

export type ScheduleType = 'daily' | 'weekly' | 'other' | 'line';
export type ScheduleContents = 'chaos' | 'guardian' | 'epona' | 'basic' | 'basicReset' | 'none';
export type ScheduleCheckType = 'check' | 'text' | 'none';

export type AddType = 'character' | 'todo' | 'line';

export interface IContextModal {
    e?: React.MouseEvent<HTMLElement>;
    modal: JSX.Element;
    title: string;
    width: string;
    height: string;
}

export interface IContextModalParam {
    onContextMenuBasicModal: ({ e, title, modal, width, height }: IContextModal) => void;
}

export interface IPortalProps {
    isOpen: boolean;
    content: ReactElement;
    options?: IPortalOption;
}

export interface IPortalOption {
    width?: string;
    height?: string;
    headerTitle?: string;
    confirmFn?: () => void | Promise<void>;
    isHeaderClose?: boolean;
}

export interface IPortalProperty {
    children: React.ReactNode;
    options?: IPortalOption;
}
