import styled from "styled-components";

import { FaHeart,FaRegHeart} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { favState, IParam } from "../atom";

const Favbutton = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  top: 100%;
  right: 0;
  padding: 0 1rem;
  svg {
    font-size: 24px;
    margin-right: 5px;
    color: ${(props) => props.theme.red};
  }
  z-index: 7;
  cursor:pointer;
`;

interface IFav {
  id: any;
  movie: any;
  category: string;
}
function FavBtn({ id, movie, category }: IFav) {
  const [favMovies, setIsLike] = useRecoilState(favState);
  const favMovie = favMovies?.find(
		(movie) => String(movie.params.movieId) === String(id)
	);
  const addFavClick = () => {
    setIsLike((oldFavMovies: any) => {
      if (!movie) return oldFavMovies;
      const favMoviesCopy = [...oldFavMovies];
      if (
        favMoviesCopy.findIndex(
          (result) => String(movie.params.movieId) === String(result.params.id)
        ) === -1
      ) {
        return [
          ...favMoviesCopy,
          {
            ...movie,
            isLike: true,
          }

        ]
      } else {
				const targetIndex = oldFavMovies.findIndex(
					(result:any) => String(movie.params.movieId) === String(result.params.id)
				);
				const oldFavMovie = favMoviesCopy[targetIndex];
				favMoviesCopy.splice(targetIndex, 1);
				const newFavMoive = {
					...oldFavMovie,
					isLike: !oldFavMovie.isLike,
				};
				favMoviesCopy.splice(targetIndex, 0, newFavMoive);
				return favMoviesCopy.filter((movie) => movie.isLike);
      }
    });
  };
  // console.log(favMovies);
  return (
    <Favbutton onClick={addFavClick}>
      {favMovie ? <FaHeart /> : <FaRegHeart />}
      찜하기
    </Favbutton>
  );
}
export default FavBtn;
