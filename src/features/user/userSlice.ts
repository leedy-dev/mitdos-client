import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { UserState } from 'src/models/states/stateModel';

const initialState: UserState = {
  userId: '',
  userName: '',
  userProfile: '',
  regDate: '',
  updDate: '',
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
