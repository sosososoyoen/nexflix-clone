import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import {
  getCredits,
  getDetail,
  getSimilar,
  ICast,
  ICredit,
  IDetail,
  IGetMovieResult,
  IMovie,
} from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { makeImagePath } from "../Routes/Utils";
import { useQuery } from "react-query";
import { ISlider } from "./Slide";
import FavBtn from "./FavBtn";
import {AnimatePresence } from "framer-motion";
import { useState } from "react";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  z-index: 99;
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
  overflow-x: hidden;
  z-index: 99;
  background-color: ${(props) => props.theme.bgLighter};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 1024px) {
    width: 80vw;
    font-size: 90%;
  }
  @media only screen and (max-width: 425px) {
    width: 95vw;
    height: 100vh;
    font-size: 70%;
  }
`;
const Runtime = styled.span`
  margin-left: 1em;
  svg {
    font-size: 1.25em;
    color: #4cd137;
    margin-right: 5px;
  }
`;
const HompageBtn = styled.button`
  background-color: ${(props) => props.theme.red};
  border: none;
  padding: 0.5em 1em;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  justify-self: flex-end;
  margin-left: 1em;
`;
const BigTagline = styled.span`
  display: block;
  font-size: 1.25em;
  line-height: 2;
`;
const BigOverview = styled.p`
  padding-top: 1.5em;
  color: ${(props) => props.theme.text};
`;
const DetailWrap = styled.div`
  padding: 0 20px;
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  position: relative;
  display: flex;
`;
const BigVote = styled.p`
  display: flex;
  align-items: center;
  font-size: 2em;
  svg {
    font-size: 1.5em;
    color: #e1b12c;
  }
  span {
    font-size: 1em;
  }
`;
const Bigdate = styled.div`
  font-size: 1em;
  position: relative;
  top: -30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const BigTitle = styled.hgroup`

  h3 {
    color: ${(props) => props.theme.text};
    font-size: 2.8em;
    position: relative;
    top: -80px;
    font-weight: 600;
  }
  h4 {
    position: relative;
    top: -85px;
  }
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
  margin-top: 3em;
  padding: 0 20px;
  font-weight: 600;
  font-size: 1.5em;
`;
const SimilarBox = styled(motion.div)<{ bigphoto: string }>`
  background-color: gray;
  height: 150px;
  background-image: url(${(props) => props.bigphoto});
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &:nth-child(3n + 1) {
    transform-origin: center left;
  }
  &:nth-child(3n) {
    transform-origin: center right;
  }
`;
const SimilarInfo = styled(motion.hgroup)`
  padding: 10px;
  background-color: ${(props) => props.theme.bgLighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4,
  h6 {
    text-align: center;
    font-weight: 600;
  }
  h6 {
    font-size: 12px;
  }
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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

// animation
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

function FavModal({ data, category, type, url }: ISlider) {
  const history = useHistory();
  const onOverlayClick = () => history.goBack();
  const { scrollY } = useViewportScroll();
  const bigMovieMatch =  useRouteMatch<{ movieId: string }>(
    `/my-list/${type}/:movieId`
  );
  console.log(bigMovieMatch);
  console.log(data);
  
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie: IMovie) => movie.id === +bigMovieMatch.params.movieId
    );
  //영화, tv 쇼 세부 정보 fetch
  const { data: detail } = useQuery<IDetail>(
    ["details", `detail_${bigMovieMatch?.params.movieId}`],
    () => getDetail("movie", bigMovieMatch?.params.movieId),
    
  );
  //영화, tv 쇼 비슷한 컨텐츠 fetch
  const { data: similar } = useQuery<IGetMovieResult>(
    ["similars", `similar_${bigMovieMatch?.params.movieId}`],
    () => getSimilar("movie", bigMovieMatch?.params.movieId)
  );
  //영화, tv 쇼 크레딧 fetch
  const { data: credits } = useQuery<ICredit>(
    ["credits", `credit_${bigMovieMatch?.params.movieId}`],
    () => getCredits("movie", bigMovieMatch?.params.movieId)
  );

  return (
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
            {/* {clickedMovie && detail ? (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                >
                  <FavBtn
                    id={clickedMovie.id}
                    movie={clickedMovie}
                    url={url}
                    type={type}
                    category={category}
                  />
                </BigCover>
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
                        clickedMovie.release_date || clickedMovie.first_air_date
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
                    {credits?.cast.slice(0, 3).map((actor: ICast) => (
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
              {similar?.results.slice(0, 9).map((program: IMovie) => (
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
                    <h6>{program.original_title || program.original_name}</h6>
                  </SimilarInfo>
                </SimilarBox>
              ))}
            </SimilarWrap> */}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}
export default FavModal;
