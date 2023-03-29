import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import User from "../../components/user/user";
import Create from '../../components/create/create'
import logo from '../../images/logo.png'
import addUserIcon from '../../images/add-user.png'

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'left',
    backgroundColor: 'azure'
  },
  topBar: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  logo: {
    width: '10%'
  },
  addUser: {
    width: '4%'
  },
  appContent: {
    paddingTop: '10px',
    backgroundColor: '#e6f2e9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '18px',
  }
}))


function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.app}>
        <div className={classes.topBar}>
          <Link to="/"><img src={logo} className={classes.logo} alt="" /></Link>
          <Link to="/create"><img src={addUserIcon} className={classes.addUser} alt="" /></Link>
        </div>
        <div className={classes.appContent}>
          <Switch>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/">
              <User />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
