/// <reference types="vite-plugin-svgr/client" />
declare module '*.module.scss';

declare global {
   type RootState = import('./../src/app/store/root-state').RootState;
   type AppDispatch = import('./../src/app/store').AppDispatch;
}

export {};
