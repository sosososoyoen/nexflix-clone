import styled from "styled-components";
import { motion } from "framer-motion";
import { IMovie } from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeImagePath } from "../Routes/Utils";
import Modal from "./Modal";
import TvModal from "./TvModal";

const Wrapper = styled.article`
  background-color: black;
  @media only screen and (max-width: 1024px) {
    font-size: 80%;
  }
  @media only screen and (max-width: 425px) {
    font-size: 60%;
  }
`;

const List = styled.div`
  position: relative;
  height: max-content;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  width: 100%;
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
  height: 200px;
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
  category?: string;
  url?: string;
  type?: string;
}
function SearchResult({ data, category, type, url }: ISlider) {
  const history = useHistory();

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
  const onBoxClicked = (movieId: number) => {
    history.push(`/${url}/${type}/${movieId}`);
  };

  //slide drag


  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    `/${url}/${type}/:movieId`
  );

  return (
    <Wrapper>
      {data && (
        <List>
          <Row>
              {data?.results
                .map((movie: IMovie) => (
                  <Box
                    layoutId={`${movie.id}${category}${type}`}
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
          </List>
      )}
      {bigMovieMatch && category === "movie" ? (
        <Modal data={data} category="movie" type={type} url={url} />
      ) : null}
      {bigMovieMatch && category === "tv" ? (
        <TvModal data={data} category="tv" type={type} url={url} />
      ) : null}
      {bigMovieMatch && category === "search" ? (
        <Modal data={data} category="search" type={type} url={url} />
      ) : null}
    </Wrapper>
  );
}
export default SearchResult;
