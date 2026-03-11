import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authServices } from '../auth/services/authService';
import type { user } from '../../api/auth/authApi';

interface AuthState {
  user:  user | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  isInitialized: false,
};

// Action asynchrone pour vérifier la session au chargement
export const initializeAuth = createAsyncThunk<user | void >('auth/initialize', async () => {
  const response = await authServices.me();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: {payload: user}) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action: {payload: user}) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      });
  },
});

export const { setUser, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;