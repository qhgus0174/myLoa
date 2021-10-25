import React, { useState } from 'react';

export function useCheckbox(initialValue: boolean): [boolean, any, React.Dispatch<React.SetStateAction<boolean>>] {
    const [checked, setChecked] = useState<boolean>(initialValue);

    const reset = () => {
        setChecked(initialValue);
    };

    const bind = {
        checked,
        onChange: () => {
            setChecked(!checked);
        },
    };

    return [checked, bind, reset];
}
