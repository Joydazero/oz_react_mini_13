import { createSlice } from "@reduxjs/toolkit";
import { fetchDiscoverMovies } from "./thunk";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers : {},
    extraReducers :(builder) => {
        builder
        .addCase(fetchDiscoverMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload; // 정제된 영화 배열
        })
        .addCase(fetchDiscoverMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Unknown error";
        });
    }
});
export default movieSlice.reducer;