const API_KEY = "a09449c148c25d33a90a05be31587c64";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export interface IGetTvResult {
  date: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export interface IGetMovieResult {
  date: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getPopularTvs() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getUpcommingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
