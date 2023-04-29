import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PizzaSummary from "./views/pizza-summary.view";
import Create from './views/create.view'

import logo from "./assets/images/logo.png"
import newLogoIcon from './assets/images/new-logo.png'
import { StyledApp, StyledAppContent, StyledLogo, StyledPizzaLogo } from "./styles";
const useStyles = makeStyles((theme) => ({
  topBar: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))


function App() {
  const classes = useStyles();

  return (
    <Router>
      <StyledApp>
        <div className={classes.topBar}>
          <Link to="/"><StyledLogo src={logo} alt="" /></Link>
          <Link to="/create"><StyledPizzaLogo src={newLogoIcon} alt="" /></Link>
        </div>
        <StyledAppContent>
          <Routes>
            <Route path='/' element={<PizzaSummary />} />
            <Route path='/create' element={<Create />} />
          </Routes>
        </StyledAppContent>
      </StyledApp>
    </Router >
  );
}

export default App;
