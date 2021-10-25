import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useTodo = createLocalStorageStateHook<string>('todo', JSON.stringify(new Array()));

export default useTodo;
