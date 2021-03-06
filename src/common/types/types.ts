import React, { ReactElement } from 'react';
import { GoldType } from '@common/types/localStorage/Ledger';

export type ScheduleType = 'daily' | 'weekly' | 'other' | 'line';
export type ScheduleContents = 'chaos' | 'guardian' | 'epona' | 'basic' | 'basicReset' | 'none';
export type ScheduleCheckType = 'check' | 'text' | 'none';

export type AddType = 'character' | 'todo' | 'line';

export interface IContextModal {
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>;
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

export interface IDropdown {
    id: string;
    name: string;
    parentid?: string;
}

export type IncomeSpendingType = 'income' | 'spending';

export interface ILedgerSaveParam {
    goodsId: string;
    type: GoldType;
    name?: string;
    gold?: number;
    imageId?: string;
    imgUrl?: string;
}
