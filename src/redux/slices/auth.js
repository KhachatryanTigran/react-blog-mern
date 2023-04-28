import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return data;
});
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);

    return data;
  }
);
const initialState = {
  posts: {
    data: null,
    status: "loading",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state, action) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        console.log(action);
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchRegister.pending, (state, action) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        console.log(action);
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
      });
  },
});
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
