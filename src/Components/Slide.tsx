
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { IGetMovieResult,IGetShowResult,IMovie,IShow } from "../api";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { makeImagePath } from "../Routes/Utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Slider = styled.div`

`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bigphoto: string }>`
  background-color: gray;
  background-image: url(${(props) => props.bigphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
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
  z-index: 9;
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
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 0 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
  font-weight: 600;
`;
const BigVote = styled.p`
  padding: 0 20px;
  position: relative;
  top: -80px;
  font-size: 2rem;
  span {
    font-size: 1rem;
  }
`;
const Bigdate = styled.p`
  position: relative;
  top: -90px;
  padding: 20px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
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
    type:string;
}
function Slide({data, category,type, url}:ISlider) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(`/${category}/:movieId`);
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
  const onOverlayClick = () => history.push(`/${url}`);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie:any) => movie.id === +bigMovieMatch.params.movieId);

    console.log(bigMovieMatch);
  console.log(clickedMovie);
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
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie:any) => (
                    <Box
                      layoutId={`${movie.id}${type}`}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      bigphoto={makeImagePath(movie.backdrop_path)}
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
            {bigMovieMatch ? (
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
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title || clickedMovie.name}</BigTitle>
                      <Bigdate>{clickedMovie.release_date || clickedMovie.first_air_date}</Bigdate>
                      <BigVote><span>평점</span> {clickedMovie.vote_average}</BigVote>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
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
