import React, { useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import SearchParams from "./components/SearchParams";
import ScrollToTop from "./components/ScrollToTop";
import Details from "./components/Details";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <ScrollToTop />
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
