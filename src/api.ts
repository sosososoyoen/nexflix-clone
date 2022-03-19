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
export interface IDetail {
  genres: IGenres[],
  homepage: string,
  original_title: string,
  original_name?: string,
  tagline:string,
  runtime: number,
}
interface IGenres {
  id: number,
  name: string,
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
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getUpcommingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
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

export function getSearchMovie(query:string|null){
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${query}}&page=1&include_adult=false`
  ).then((response) => response.json());
}
export function getSearchShows(query:string|null){
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&query=${query}}&page=1&include_adult=false`
  ).then((response) => response.json());
}
export function getDetail(category:string|undefined,movieId:string|undefined){
  return fetch(
    `${BASE_PATH}/${category}/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getSimilar(category:string|undefined,movieId:string|undefined){
  return fetch(
    `${BASE_PATH}/${category}/${movieId}/similar?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
export function getCredits(category:string|undefined,movieId:string|undefined){
  return fetch(
    `${BASE_PATH}/${category}/${movieId}/credits?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}