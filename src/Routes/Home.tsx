import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import Slide from "../Components/Slide";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background-color: black;
  height: max-content;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;
function Home() {

  const { data:nowPlaying, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
            <Banner data={nowPlaying} />
            <SlideTitle>상영 중인 영화</SlideTitle>
            <Slide  data={nowPlaying} type="nowPlaying" category="movie" url="" />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
