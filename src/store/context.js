import React from 'react';
import { createContext } from 'react';
import {store} from "./store";

export const Context = createContext(store);

export const StoreProvider = ({ children }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
};