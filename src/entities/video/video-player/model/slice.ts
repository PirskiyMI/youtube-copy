import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
   id: string;
   title: string;
}

const initialState: State = {
   id: '',
   title: '',
};

const videoPlayerSlice = createSlice({
   name: 'videoPlayer',
   initialState,
   reducers: {
      setVideoId: (state, { payload }: PayloadAction<string>) => {
         state.id = payload;
      },
      setVideoTitle: (state, { payload }: PayloadAction<string>) => {
         state.title = payload;
      },
   },
});

export const videoPlayerActions = videoPlayerSlice.actions;
export const videoPlayerReducer = videoPlayerSlice.reducer;
