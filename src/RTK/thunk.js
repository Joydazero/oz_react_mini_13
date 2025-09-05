import { createAsyncThunk } from "@reduxjs/toolkit";
import { HEADERS, IMG_PATH } from "../utils/constants";

export const fetchDiscoverMovies = createAsyncThunk(
    'movies/fetchDiscoverMovies', 
    async (_, { rejectWithValue }) => {
        try {
                const url =
                    'https://api.themoviedb.org/3/discover/movie'
                    + '?language=ko'
                    + '&sort_by=popularity.desc'
                    + '&include_adult=false'
                    + '&include_video=false'
                    + '&certification_country=US'
                    + '&certification.lte=PG-13'
                    + '&page=1';
                const res = await fetch(url, { method: "GET", headers: HEADERS });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                const movies = (json.results || [])
                    .filter(result => result && result.poster_path && result.adult === false)
                    .map(result => ({
                    id: result.id,
                    title: result.title,
                    img: `${IMG_PATH}${result.poster_path}`,
                    date: result.release_date,
                    rating: result.vote_average,
                    overview: result.overview
                }));
                return movies; 

        } catch (error) {
                return rejectWithValue(err.message || "Failed to fetch movies");
        }
    }
)