import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
   searchCategory: string;
}

const initialState: IState = {
   searchCategory: 'Все',
};

const categorySlice = createSlice({
   name: 'category',
   initialState,
   reducers: {
      setSearchCategory: (state, { payload }: PayloadAction<string>) => {
         state.searchCategory = payload;
      },
   },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
