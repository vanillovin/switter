import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import Message from 'components/Message';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  // <Route exact path="/">
  //   {isLoggedIn ? <Home /> : <Auth />}
  // </Route>;

  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn && <Navigation userObj={userObj} />}
          {isLoggedIn ? (
            <div
              style={{
                width: '100%',
                margin: '0 auto',
                // marginTop: 80,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Route exact path="/msg">
                <Message userName={userObj.displayName} />
              </Route>
            </div>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              {/* <Redirect from="*" to="/" /> */}
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
