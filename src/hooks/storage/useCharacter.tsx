import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useCharacter = createLocalStorageStateHook<string>('character', JSON.stringify(new Array()));

export default useCharacter;
