import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';

const useCharacterOrd = createLocalStorageStateHook<string>('characterOrd', '[]');

export default useCharacterOrd;
