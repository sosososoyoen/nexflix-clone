import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atom";
import { HelmetProvider } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Pretendard-Regular', sans-serif;
  color:${(props) => props.theme.textDarker};
  background-color: ${(props) => props.theme.bgDarker};
  line-height: 1.2;
  width:100%;
  overflow-x:hidden;
  
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const FooterWrap = styled.footer`
  margin-top: 7rem;
  width: 100%;
  padding: 2rem;
  text-align: center;
  font-size: 12px;
`;


function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <HelmetProvider>
          <GlobalStyle />
          <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Switch>
              <Route path={["/tv", "/tv/*/:movieId"]}>
                <Tv />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              {/* path가 "/"면 route 맨 끝으로 가야함 (리액트 라우터 5.3버젼 한정) */}
              {/* 이유: "/"가 들어가기만 해도 다 참으로 취급해버려서 home 컨텐츠가 뜸 */}
              <Route path={["/", "/movies/*/:movieId"]}>
                <Home />
              </Route>
            </Switch>
          </Router>
          <FooterWrap>
            Portfollio <br /> hothemp35@gmail.com / Lee Soyeon
          </FooterWrap>
          <ReactQueryDevtools initialIsOpen={true} />
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
