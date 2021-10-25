import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useCharacterOrd = createLocalStorageStateHook<string>('characterOrd', JSON.stringify(new Array()));

export default useCharacterOrd;
