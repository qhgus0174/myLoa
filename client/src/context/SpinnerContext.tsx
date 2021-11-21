import React, { createContext, useState } from 'react';
import Spinner from '@components/Spinner/Spinner';

interface ISpinner {
    spinnerVisible: boolean;
    setSpinnerVisible: (e: boolean) => void;
}

export const SpinnerContext = createContext<ISpinner>({ spinnerVisible: false, setSpinnerVisible: (e: boolean) => {} });

const SpinnerProvider = ({ children }: { children: React.ReactNode }) => {
    const [spinnerVisible, setSpinnerVisible] = useState<ISpinner['spinnerVisible']>(false);

    return (
        <SpinnerContext.Provider value={{ spinnerVisible, setSpinnerVisible }}>
            <Spinner />
            {children}
        </SpinnerContext.Provider>
    );
};

export default SpinnerProvider;
