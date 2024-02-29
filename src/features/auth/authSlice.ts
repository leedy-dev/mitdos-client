import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { LoginData } from 'src/models/datas/dataModel';
import { AuthState } from 'src/models/states/stateModel';
import { logIn, logOut } from "src/services/authApi";
import { AsyncThunkOptions } from "@reduxjs/toolkit/dist/createAsyncThunk";

const initialState: AuthState = {
    accessToken: null,
    status: 'idle',
};

const loginAsync = createAsyncThunk(
    'user/login',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return await logIn(data);
        } catch (err) {
            return rejectWithValue(err);
        }
    });

const logOutAsync = createAsyncThunk(
    'user/logout',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return await logOut(data);
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
                state.accessToken += action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(logOutAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(logOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.accessToken = '';
            })
            .addCase(logOutAsync.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const authSliceActions = {...authSlice.actions};
export const selectAuth = (state: RootState) => state["auth"].accessToken;

export default authSlice.reducer;
