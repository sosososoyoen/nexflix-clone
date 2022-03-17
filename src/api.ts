const API_KEY = "a09449c148c25d33a90a05be31587c64";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
export interface IShow {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export interface IGetShowResult {
  date: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IShow[];
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
export function getPopularShows() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getTopShows() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getOnAirShows() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
