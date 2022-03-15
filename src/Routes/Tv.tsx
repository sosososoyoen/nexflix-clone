import styled from "styled-components";
import Popular from "../Components/Popular";
import Upcomming from "../Components/Upcomming";


const Wrapper = styled.div`
  margin-top: 10rem;
`;

function Tv() {
  return (
    <>
    <Popular />
    <Wrapper>

    <Upcomming />

    </Wrapper>
    
    </>
  )
}
export default Tv;
