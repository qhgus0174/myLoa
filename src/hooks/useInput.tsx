import React, { useCallback, useState } from 'react';

/**
 * ? useage : <TextBox {...bindContent} />
 */

export function useInput<T>(
    initialValue: T,
    option?: {
        numberOnly?: boolean;
        maxLength?: number;
    },
): [T, any, (e: any) => void, () => void] {
    const [value, setValue] = useState<T>(initialValue);

    const reset = useCallback(() => setValue(initialValue), [initialValue]);

    const settingValue = (e: any) => {
        setValue(e);
    };

    const bind = {
        value,
        onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (option?.numberOnly && !/[0-9]/.test(e.key)) e.preventDefault();
        },
        onChange: (e: React.ChangeEvent<any>) => {
            setValue(e.target?.value);
        },
        maxLength: option?.maxLength,
    };

    return [value, bind, settingValue, reset];
}
