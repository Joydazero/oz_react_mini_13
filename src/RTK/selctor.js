import { createSelector } from "@reduxjs/toolkit";


export const selectMoviesByRegExp = (reg) =>
  createSelector(
    // 입력 셀렉터: 전역 상태에서 영화 배열만 뽑기
    (state) => state.movies.data,
    // 결과 셀렉터: 필터링
    (movies) => {
      if (!Array.isArray(movies)) return [];
      if (!reg) return movies;                // 검색어 없으면 전부 반환
      return movies.filter((el) => el.title.match(reg));
    }
  );