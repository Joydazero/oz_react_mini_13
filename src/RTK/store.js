import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slice";


const store = configureStore({
    reducer : {
        movies : movieSlice.reducer
    }
})

export default store;