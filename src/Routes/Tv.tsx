import { useQuery } from "react-query";
import styled from "styled-components";
import { getOnAirShows, getPopularShows, getTopShows, IGetMovieResult } from "../api";
import Slide from "../Components/Slide";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideWrap = styled.div`
  margin-top: 20em;
`
const SlideTitle = styled.h2`
  font-size: 1.5rem;
  font-family: 600;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;
function Home() {

  const { data:popularShows, isLoading:loadPopulars } = useQuery<IGetMovieResult>(
    ["shows", "popularShows"],
    getPopularShows
  );
  const { data:topShows, isLoading:loadTops } = useQuery<IGetMovieResult>(
    ["shows", "topShows"],
    getTopShows
  );
  const { data:onAirShows, isLoading:loadOnAir } = useQuery<IGetMovieResult>(
    ["shows", "onAirShows"],
    getOnAirShows
  );
  

  return (
    <Wrapper>
      {loadPopulars&&loadTops&&loadOnAir ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
            <Banner data={popularShows} />
            <SlideTitle>인기 시리즈</SlideTitle>
            <Slide  data={popularShows} category="tv" type="popular" url="tv" />
            <SlideWrap>
            <SlideTitle>평판이 좋은 시리즈</SlideTitle>
            <Slide  data={topShows} category="tv" type="topRated" url="tv" />
            </SlideWrap>
            <SlideWrap>
            <SlideTitle>방영 중인 시리즈</SlideTitle>
            <Slide  data={onAirShows} category="tv" type="onAir" url="tv" />
            </SlideWrap>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
