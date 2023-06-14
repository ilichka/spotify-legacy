import { useContext } from 'react';

import { Context } from './context';

export const useStore = () => {
    const rootStore = useContext(Context);

    if (!rootStore) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return rootStore;
};