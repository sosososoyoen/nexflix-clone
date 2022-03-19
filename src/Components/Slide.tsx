import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getCredits,
  getDetail,
  getSimilar,
  IDetail,
  IGetMovieResult,
  IGetShowResult,
  IMovie,
  IShow,
} from "../api";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FaAngleRight, FaAngleLeft, FaStar } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { makeImagePath } from "../Routes/Utils";
import { useQuery } from "react-query";

const Wrapper = styled.article`
  background-color: black;
`;

const Slider = styled.div`
  height: 200px;
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Box = styled(motion.div)<{ bigphoto: string }>`
  background-color: gray;
  background-image: url(${(props) => props.bigphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const SlideBtn = styled.button`
  position: absolute;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 5;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 48px;
  padding: 1rem;
  opacity: 0;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: red;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: auto;
  z-index: 99;
  background-color: ${(props) => props.theme.black.lighter};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const DetailWrap = styled.div`
  padding: 0 20px;
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.hgroup`
  h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 46px;
    position: relative;
    top: -80px;
    font-weight: 600;
  }
  h4 {
    position: relative;
    top: -85px;
  }
`;

const BigVote = styled.p`
  display: flex;
  align-items: center;
  font-size: 2rem;
  svg {
    font-size: 1.5rem;
    color: #e1b12c;
  }
  span {
    font-size: 1rem;
  }
`;
const Bigdate = styled.div`
  font-size: 1rem;
  position: relative;
  top: -30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Runtime = styled.span`
  margin-left: 1rem;
  svg {
    font-size: 20px;
    color: #4cd137;
    margin-right: 5px;
  }
`;
const GenresList = styled.ul`
  display: flex;
  justify-content: flex-end;
  span {
    color: gray;
  }
  li {
    margin-left: 5px;
  }
`;
const CreditList = styled(GenresList)``;
const HompageBtn = styled.button`
  background-color: ${(props) => props.theme.red};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  justify-self: flex-end;
  margin-left: 1rem;
`;
const BigTagline = styled.summary`
  font-size: 1.25rem;
  line-height: 2;
`;
const BigOverview = styled.p`
  padding-top: 1.5rem;
  color: ${(props) => props.theme.white.lighter};
`;

const SimilarWrap = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
`;
const SimilarTitle = styled.h3`
  margin-top: 3rem;
  padding: 0 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;
const SimilarBox = styled(motion.div)<{ bigphoto: string }>`
  background-color: gray;
  height: 150px;
  background-image: url(${(props) => props.bigphoto});
  background-size: cover;
  background-position: center center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    &:nth-child(3n+1) {
    transform-origin: center left;
  }
  &:nth-child(3n) {
    transform-origin: center right;
  }
`;
const SimilarInfo = styled(motion.hgroup)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4,h6 {
    text-align: center;
    font-weight: 600;
  }
  h6 {
    font-size: 12px;
  }
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;
interface ISlider {
  data: any;
  category: string;
  url: string;
  type: string;
}
function Slide({ data, category, type, url }: ISlider) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    `/${category}/${type}/:movieId`
  );
  const { scrollY } = useViewportScroll();

  const rowVariants = {
    hidden: (back: boolean) => ({
      x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
    }),
    visible: {
      x: 0,
    },
    exit: (back: boolean) => ({
      x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
    }),
  };

  const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -40,
      transition: {
        delay: 0.3,
      },
    },
  };
  // 슬라이드 관련 state
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const increaseIndex = () => {
    if (data) {
      //슬라이드 애니메이션이 진행중이면 함수 종료
      if (leaving) return;
      // 두번 연속해서 누르면 leaving이 true가 되기 때문에
      // setIndex 발동하지 않고 함수 종료
      //그러나 계속 true 상태로 잇음;; 이걸 onExitComplete prop으로 해결함
      setLeaving(true);
      setBack(false);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      setBack(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/${category}/${type}/${movieId}`);
  };
  const onOverlayClick = () => history.goBack();
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie: any) => movie.id === +bigMovieMatch.params.movieId
    );

  //영화, tv 쇼 세부 정보 fetch
  const { data: detail } = useQuery<IDetail>(
    ["details", `detail_${bigMovieMatch?.params.movieId}`],
    () => getDetail(category, bigMovieMatch?.params.movieId)
  );
  //영화, tv 쇼 비슷한 컨텐츠 fetch
  const { data: similar } = useQuery<any>(
    ["similars", `sijilar_${bigMovieMatch?.params.movieId}`],
    () => getSimilar(category, bigMovieMatch?.params.movieId)
  );
  //영화, tv 쇼 크레딧 fetch
  const { data: credits } = useQuery<any>(
    ["credits", `credit_${bigMovieMatch?.params.movieId}`],
    () => getCredits(category, bigMovieMatch?.params.movieId)
  );

  return (
    <Wrapper>
      {data && (
        <>
          <Slider>
            <SlideBtn style={{ left: 0 }} onClick={decreaseIndex}>
              <FaAngleLeft />
            </SlideBtn>
            <SlideBtn style={{ right: 0 }} onClick={increaseIndex}>
              <FaAngleRight />
            </SlideBtn>
            {/* onExitComplete: exit가 끝났을 때 실행됨 */}
            {/* initial: false 처음 렌더됏을 때 initial 애니메이션이 작동안함*/}
            <AnimatePresence
              custom={back}
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                custom={back}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie: any) => (
                    <Box
                      layoutId={`${movie.id}${type}`}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      bigphoto={makeImagePath(movie.backdrop_path,"w400")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title || movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch && data ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={`${bigMovieMatch.params.movieId}${type}`}
                >
                  {clickedMovie && detail ? (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <DetailWrap>
                        <BigTitle>
                          <h4>
                            {clickedMovie.original_title ||
                              clickedMovie.original_name}
                          </h4>
                          <h3>{clickedMovie.title || clickedMovie.name}</h3>
                        </BigTitle>

                        <Bigdate>
                          <span>
                            {(
                              clickedMovie.release_date ||
                              clickedMovie.first_air_date
                            ).substr(0, 4)}
                          </span>
                          {detail.runtime ? (
                            <Runtime>
                              <BiCameraMovie />
                              {Math.floor(detail?.runtime / 60)}시간
                              {detail?.runtime % 60}분
                            </Runtime>
                          ) : null}
                          {detail?.homepage ? (
                            <HompageBtn
                              onClick={() => {
                                window.open(detail.homepage);
                              }}
                            >
                              공식 홈페이지
                            </HompageBtn>
                          ) : null}
                        </Bigdate>
                        <BigVote>
                          <FaStar /> {clickedMovie.vote_average}
                          <span>점</span>
                        </BigVote>
                        <GenresList>
                          <span>장르: </span>
                          {detail?.genres.map((genre) => (
                            <li key={genre.id}>{genre.name},</li>
                          ))}
                        </GenresList>
                        <CreditList>
                          <span>출연: </span>
                          {credits?.cast.slice(0, 3).map((actor: any) => (
                            <li key={actor.id}>{actor.name},</li>
                          ))}
                        </CreditList>
                        <BigOverview>
                          <BigTagline>{detail?.tagline}</BigTagline>

                          {clickedMovie.overview}
                        </BigOverview>
                      </DetailWrap>
                    </>
                  ) : null}
                  <SimilarTitle>비슷한 콘텐츠</SimilarTitle>
                  <SimilarWrap>
                    {similar?.results.slice(0, 9).map((program: any) => (
                      <SimilarBox
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                        key={program.id}
                        bigphoto={makeImagePath(program.backdrop_path, "w300")}
                      >
                        <SimilarInfo variants={infoVariants}>
                          <h4>{program.title || program.name}</h4>
                          <h6>
                            {program.original_title || program.original_name}
                          </h6>
                        </SimilarInfo>
                      </SimilarBox>
                    ))}
                  </SimilarWrap>
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Slide;
