import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj }) => {
  // <Route exact path="/">
  //   {isLoggedIn ? <Home /> : <Auth />}
  // </Route>;

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile" component={Profile} />
            {/* <Redirect from="*" to="/" /> */}
          </>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
            {/* <Redirect from="*" to="/" /> */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
