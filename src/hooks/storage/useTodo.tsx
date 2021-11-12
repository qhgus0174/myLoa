import { createLocalStorageStateHook } from 'use-local-storage-state';

const useTodo = createLocalStorageStateHook<string>('todo', '[]');

export default useTodo;
