import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '@/features/auth/types/auth.types';

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserProfile | null; accessToken: string | null }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = !!action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    }
  },
});

export const { setCredentials, logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
