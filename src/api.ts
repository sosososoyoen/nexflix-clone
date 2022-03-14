import { StringMappingType } from "typescript";

const API_KEY = "a09449c148c25d33a90a05be31587c64";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id:number;
    backdrop_path:string;
    poster_path: string;
    title:string,
    overview:string;
}

export interface IGetMovieResult {
    date: {
        maximum:string
        minimum:string
    }
    page:number,
    results: IMovie[],
    total_pages: number,
    total_results: number,

}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
