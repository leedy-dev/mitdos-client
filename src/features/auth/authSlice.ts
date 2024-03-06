import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { LoginData } from 'src/models/datas/dataModel';
import { AuthState } from 'src/models/states/stateModel';
import { signIn, signOut } from "src/services/authApi";

const initialState: AuthState = {
    accessToken: null,
    status: 'idle',
};

export const loginAsync = createAsyncThunk(
    'auth/sign-in',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return signIn(data)
        } catch (err) {
            return rejectWithValue(err);
        }
    });

export const logOutAsync = createAsyncThunk(
    'auth/sign-out',
    async (data, { rejectWithValue }) => {
        try {
            return signOut()
        } catch (err) {
            return rejectWithValue(err);
        }
    });

export const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.accessToken = action.payload.data.accessToken;
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'failed';
            })
            .addCase(logOutAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(logOutAsync.fulfilled, state => {
                state.status = 'idle';
                state.accessToken = null;
            })
            .addCase(logOutAsync.rejected, state => {
                state.status = 'failed';
            });
    },
});

export const authSliceActions = {...authSlice.actions};
export const selectAuth = (state: RootState) => state["auth"].accessToken;

export default authSlice.reducer;
