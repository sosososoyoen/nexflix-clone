import styled from "styled-components";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { favState} from "../atom";
import { useState } from "react";
import { IMovie } from "../api";

const Favbutton = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  top: 90%;
  right: 0;
  padding: 0 1rem;
  svg {
    font-size: 24px;
    margin-right: 5px;
    color: ${(props) => props.theme.red};
  }
  z-index: 7;
  cursor: pointer;
`;

interface IFav {
  id: number;
  movie: IMovie;
  url?: string;
  type?:string;
  category?:string;
}
function FavBtn({ id, movie, url, type,category }: IFav) {
  const [favourites, setFavourites] = useRecoilState(favState);
  // favMovie: 찜 목록에 해당 movie가 있는지 확인
  // true => 꽉찬 하트 아이콘 false => 빈 하트
  const favMovie = favourites?.find(
		(movie) => String(movie.id) === String(id)
	);
  const addFavClick = () => {
    //찜 상태가 아닌 경우 => 찜 목록에 추가
    if (
      favourites.findIndex(
        (result) =>
          String(movie.id) === String(result.id)
      ) === -1
    ) {
      setFavourites((oldFavourites) => [...oldFavourites, {...movie, url,type,category}]);
    } else {
      //찜 상태인 경우 => 찜 목록에서 삭제
      setFavourites((oldFavourites) =>
        oldFavourites.filter(
          (favourite) => favourite.id !== movie.id
        )
      );
    }
  };

  return (
    <Favbutton onClick={addFavClick}>
      {favMovie ? <FaHeart /> : <FaRegHeart />}
      찜하기
    </Favbutton>
  );
}
export default FavBtn;
