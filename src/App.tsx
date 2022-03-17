import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <>
    <Router>

      <Header />
      <Switch>
        <Route path={["/tv","/tv/*/:movieId"]}>
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        {/* path가 "/"면 route 맨 끝으로 가야함 (리액트 라우터 5.3버젼 한정) */}
        {/* 이유: "/"가 들어가기만 해도 다 참으로 취급해버려서 home 컨텐츠가 뜸 */}
        <Route path={["/","/movies/*/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
    <ReactQueryDevtools initialIsOpen={true} />
    </>

  );
}

export default App;
