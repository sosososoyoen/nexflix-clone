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
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 600;
`;
const Overview = styled.p`
  font-size: 1.5rem;
  width: 45%;
`;

interface IBanner {
  data: any;
}
function Banner({ data }: IBanner) {
  return (
    <Wrapper>
      {data && (
        <BannerWrap
          bgPhoto={makeImagePath(data.results[0].backdrop_path || "")}
        >
          <Title>{data.results[0].title || data.results[0].name}</Title>
          <Overview>{data.results[0].overview}</Overview>
        </BannerWrap>
      )}
    </Wrapper>
  );
}
export default Banner;
