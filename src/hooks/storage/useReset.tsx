import React from 'react';
import { createLocalStorageStateHook } from 'use-local-storage-state';
import { DateTime } from 'luxon';

const useReset = createLocalStorageStateHook<string>('datetime', DateTime.now().toFormat('X'));

export default useReset;
