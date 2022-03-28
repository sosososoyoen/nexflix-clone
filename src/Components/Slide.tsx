import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IMovie } from "../api";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { makeImagePath } from "../Routes/Utils";
import Modal from "./Modal";

const Wrapper = styled.article`
  background-color: black;
  @media only screen and (max-width: 1024px) {
    font-size: 80%;
  }
  @media only screen and (max-width: 425px) {
    font-size: 60%;
  }
`;

const Slider = styled.div`
  height: 12.5em;
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
  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
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
  @media only screen and (max-width: 1024px) {
    display: none;
  }
  
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.bgLighter};
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
  z-index: 99;
`;

// animations
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



export interface ISlider {
  data: any;
  category: string;
  url: string;
  type: string;
}
function Slide({ data, category, type, url }: ISlider) {
  const history = useHistory();
  const onOverlayClick = () => history.push(`/${url}`);
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
  const [offset, setOffset] = useState(6)
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
  const detailMatch = useRouteMatch(`/${category}/${type}/:movieId`);
  
  //slide drag 

  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  //mobile
  const [isMobile,setIsMobile] = useState(false);
  // 리사이즈 이벤트를 감지하여 가로 길이에 따라 모바일 여부 결정
  const resizingHandler = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
      setOffset(4)
    } else {
      setIsMobile(false);
      setOffset(6)
    }
  };
  // 우선 맨 처음 1024면 모바일 처리
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
      setOffset(4);
    }
    
    window.addEventListener("resize", resizingHandler);
    return () => {
      // 메모리 누수를 줄이기 위한 removeEvent
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

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
                {...(isMobile && {drag:"x",
                dragElastic:1,
                dragConstraints:{ left: 0, right: 0 },
              })}
                onDragEnd={(event, { offset, velocity }) => {
                  console.log(offset.x, velocity.x)
                  const swipe = swipePower(offset.x,velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    increaseIndex();
                  } else if (swipe > swipeConfidenceThreshold) {
                    decreaseIndex();
                  }
                }}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie: IMovie) => (
                    <Box
                      layoutId={`${movie.id}${type}`}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      bigphoto={makeImagePath(movie.backdrop_path, "w400")}
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
            {detailMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <Modal data={data} type={type} category={category} url={url} />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Slide;
