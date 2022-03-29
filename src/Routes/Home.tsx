import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, getTopRatedMovies, getUpcommingMovies, IGetMovieResult } from "../api";
import Slide from "../Components/Slide";
import Banner from "../Components/Banner";
import { Helmet } from "react-helmet-async";

const Wrapper = styled.main`
  background-color: ${props => props.theme.bgDarker};
  height: max-content;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SlideWrap = styled.div`
  margin-top: 5rem;
`;
const SlideTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;
function Home() {
  const { data: nowPlaying, isLoading:LoadNP } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: popularMovie, isLoading:LoadPopularMovies } = useQuery<IGetMovieResult>(
    ["movies", "popularMovie"],
    getPopularMovies
  );
  const { data: TopMovie, isLoading:LoadTopMovies } = useQuery<IGetMovieResult>(
    ["movies", "TopMovie"],
    getTopRatedMovies
  );
  const { data: UpcommingMovie, isLoading:LoadUpcommings } = useQuery<IGetMovieResult>(
    ["movies", "UpcommingMovie"],
    getUpcommingMovies
  );

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nooflix Clone - 영화</title>
      </Helmet>
      {LoadNP && LoadPopularMovies && LoadTopMovies && LoadUpcommings ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={popularMovie} category="movie" />
          <SlideTitle>상영 중인 영화</SlideTitle>
          <Slide data={nowPlaying} type="nowPlaying" category="movie" url="" />
          <SlideWrap>
          <SlideTitle>인기 영화</SlideTitle>
          <Slide data={popularMovie} type="popularMovie" category="movie" url="" />
          </SlideWrap>
          <SlideWrap>
          <SlideTitle>평판이 좋은 영화</SlideTitle>
          <Slide data={TopMovie} type="TopMovie" category="movie" url="" />
          </SlideWrap>
          <SlideWrap>
          <SlideTitle>개봉 예정인 영화</SlideTitle>
          <Slide data={UpcommingMovie} type="UpcommingMovie" category="movie" url="" />
          </SlideWrap>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
