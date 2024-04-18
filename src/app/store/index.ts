import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-state';

const setupStore = () => configureStore({ reducer: rootReducer });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
