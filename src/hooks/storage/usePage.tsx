import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const usePage = createLocalStorageStateHook<number>('currentPage', 1);

export default usePage;
