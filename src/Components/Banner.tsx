import styled from "styled-components";
import { makeImagePath } from "../Routes/Utils";

const Wrapper = styled.article`
  background-color: ${props => props.theme.bgLighter};
`;

const BannerWrap = styled.div<{ bgPhoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.75rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;
const Title = styled.h2`
  font-size: 4.25rem;
  font-weight: 600;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px) {
    font-size:1.5rem;
  }
`;
const Tagline = styled.h3`
  font-size: 2rem;
  padding: 15px 0;
  font-weight: 600;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px) {
    font-size:1.25rem;
  }
`
const Overview = styled.p`
  font-size: 1.25rem;
  width: 45%;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px){
  width: 50%;
  font-size: 1rem;
  }
  @media only screen and (max-width: 625px) {
    display: none;
  }
`;

interface IBanner {
  data: any;
  category: string;
}
function Banner({ data, category }: IBanner) {
  return (
    <Wrapper>      {data && (
        <BannerWrap
          bgPhoto={makeImagePath(data.results[0].backdrop_path || "")}
        >
          <Title>{data.results[0].title || data.results[0].name}</Title>
          <Tagline>{category==="movie" ? `오늘의 인기 영화 1위` : `오늘의 인기 시리즈 1위`}</Tagline>
          <Overview>{data.results[0].overview}</Overview>
        </BannerWrap>
      )}
    </Wrapper>
  );
}
export default Banner;
