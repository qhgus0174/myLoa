import React, { useState } from 'react';

export function useCheckbox(
    initialValue: boolean,
): [boolean, any, (e: boolean) => void, React.Dispatch<React.SetStateAction<boolean>>] {
    const [checked, setChecked] = useState<boolean>(initialValue);

    const reset = () => {
        setChecked(initialValue);
    };

    const settingValue = (e: boolean) => {
        setChecked(e);
    };

    const bind = {
        checked,
        onChange: () => {
            setChecked(!checked);
        },
    };

    return [checked, bind, settingValue, reset];
}
