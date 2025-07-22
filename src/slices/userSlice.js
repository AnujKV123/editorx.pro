import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false, 
    accessToken: null,
    refreshToken: null,
    user: null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        },
        userLogout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        },
        refreshAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken
        },
        updateAvatar: (state, action) => {
            state.user = action.payload.user
        },

    }
});

export const {
    userLogin, 
    userLogout,
    refreshAccessToken,
    updateAvatar
} = userSlice.actions

export default userSlice.reducer