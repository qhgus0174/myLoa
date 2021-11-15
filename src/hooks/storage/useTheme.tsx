import React from 'react';
import { IThemeStyle } from '@style/theme';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useTheme = createLocalStorageStateHook<IThemeStyle>('theme', 'basic');

export default useTheme;
