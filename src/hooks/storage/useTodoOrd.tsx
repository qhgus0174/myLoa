import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useTodoOrd = createLocalStorageStateHook<string>('todoOrd', JSON.stringify(new Array()));

export default useTodoOrd;
