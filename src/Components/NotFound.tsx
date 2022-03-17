import styled from "styled-components";

const NotFoundWrap = styled.span`
  height: 75vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

function NotFound() {
    return (
        <NotFoundWrap>
            검색 결과가 없습니다😢
        </NotFoundWrap>
    )
}
export default NotFound;