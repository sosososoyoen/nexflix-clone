import { useQuery } from "react-query";
import styled from "styled-components";
import { getVideo, IVideo, } from "../api";
import { makeImagePath } from "../Routes/Utils";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const Wrapper = styled.article`
  background-color: ${(props) => props.theme.bgLighter};
`;

const BannerWrap = styled.div<{ bgPhoto: string }>`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  padding: 3.75rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 625px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const InfoWrap = styled.div`
  width: 60%;
  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;
const YouTubeWrap = styled.div`
  width: 60%;
  @media only screen and (max-width: 625px) {
    width: 100%;
    margin-bottom: 2em;
  }
  iframe {
    @media only screen and (max-width: 1024px) {
    width: 100%;
  }
  }
`;
const Title = styled.h2`
  font-size: 4.25rem;
  font-weight: 600;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;
const Tagline = styled.h3`
  font-size: 2rem;
  padding: 15px 0;
  font-weight: 600;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;
const Overview = styled.p`
  font-size: 1.25rem;
  width: 70%;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 1px 10px;
  @media only screen and (max-width: 1024px) {
    width: 70%;
    font-size: 1rem;
  }
  @media only screen and (max-width: 625px) {
    display: none;
  }
`;

const InfoBtn = styled.button`
margin-top: 1rem;
  border:none;
  padding: 0.5em 1em;
  cursor:pointer;
  background-color: rgba(47, 47, 47);
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: 0.3s;
  &:hover {
    background-color: #686868;
  }
  &:active {
    border: 1px white solid;
  }
  svg{
    margin-right: 0.5rem;
  }
  @media only screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`

interface IBanner {
  data: any;
  category: string;
}
function Banner({ data, category }: IBanner) {
  const [randomNumber, setRandomNumber] = useState(0);
  useEffect(() => {
    const min = 0;
    const max = 20;
    setRandomNumber(Math.floor(min + Math.random() * (max - min)));
  }, []);

  //영화, tv 쇼 트레일러 fetch
  const { data: videos, isLoading: loadVideo } = useQuery<IVideo>(
    ["videos", `video_${data?.results[randomNumber].id}`],
    () => getVideo("movie", data?.results[randomNumber].id)
  );
  const history = useHistory();
  const onBoxClicked = (movieId: number) => {
    history.push(`/movie/popularMovie/${movieId}`);
  };
  return (
    <Wrapper>
      {data && (
        <BannerWrap
          bgPhoto={makeImagePath(
            data.results[randomNumber].backdrop_path || ""
          )}
        >
          <InfoWrap>
            <Title>{data.results[randomNumber].title}</Title>
            <Tagline>{`오늘의 인기 영화 ${randomNumber + 1}위`}</Tagline>
            <Overview>{data.results[randomNumber].overview}</Overview>
            <InfoBtn onClick={() => onBoxClicked(data?.results[randomNumber].id)}><FaInfoCircle />상세 정보</InfoBtn>
          </InfoWrap>
          {category === "movie" && loadVideo ? (
            "loading"
          ) : videos?.results.length === 0 ? null : (
            <YouTubeWrap>
              <YouTube
                videoId={videos?.results[videos?.results.length - 1].key}
                opts={{
                  width: "560",
                  height: "315",
                  playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                  },
                }}
                onEnd={(e)=>{e.target.stopVideo(0); e.target.clearVideo();}}      
              />
            </YouTubeWrap>
          )}
          

        </BannerWrap>
      )}
    </Wrapper>
  );
}
export default Banner;
