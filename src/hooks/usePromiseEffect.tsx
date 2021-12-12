import { DependencyList, useEffect, useState } from 'react';

type PromiseState<T> =
    | { status: 'idle' | 'pending'; result: null; error: null }
    | { status: 'fulfilled'; result: T; error: null }
    | { status: 'rejected'; result: null; error: Error };

export function usePromiseEffect<T>(effect: () => Promise<T>, deps: DependencyList) {
    const [state, setState] = useState<PromiseState<T>>({
        status: 'idle',
        result: null,
        error: null,
    });

    useEffect(() => {
        effect()
            .then(result => setState({ status: 'fulfilled', result, error: null }))
            .catch(error => setState({ status: 'rejected', result: null, error }));
    }, deps);

    return state;
}
