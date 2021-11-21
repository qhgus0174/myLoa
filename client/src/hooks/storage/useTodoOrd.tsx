import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useTodoOrd = createLocalStorageStateHook<string>('todoOrd', '[]');

export default useTodoOrd;
