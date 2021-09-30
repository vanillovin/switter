import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import Message from 'components/Message';

const AppRouter = ({
  refreshUser,
  isLoggedIn,
  userObj,
  darkMode,
  onDarkMode,
}) => {
  // <Route exact path="/">
  //   {isLoggedIn ? <Home /> : <Auth />}
  // </Route>;

  return (
    <Router>
      <Switch>
        <>
          <div className={darkMode ? 'test dark' : 'test'}>
            <div className={darkMode ? 'left dark' : 'left'}>
              {isLoggedIn && (
                <Navigation
                  userObj={userObj}
                  darkMode={darkMode}
                  onDarkMode={onDarkMode}
                />
              )}
            </div>
            {isLoggedIn ? (
              <div
                className={darkMode ? 'right dark' : 'right'}
                // style={{
                //   width: '100%',
                //   margin: '0 auto',
                //   // marginTop: 80,
                //   display: 'flex',
                //   justifyContent: 'center',
                // }}
              >
                <Route exact path="/">
                  <Home
                    userObj={userObj}
                    darkMode={darkMode}
                    onDarkMode={onDarkMode}
                  />
                </Route>
                <Route exact path="/profile">
                  <Profile
                    userObj={userObj}
                    refreshUser={refreshUser}
                    darkMode={darkMode}
                  />
                </Route>
                <Route exact path="/msg">
                  <Message userName={userObj.displayName} />
                </Route>
              </div>
            ) : (
              <>
                <Route exact path="/">
                  <Auth darkMode={darkMode} />
                </Route>
                {/* <Redirect from="*" to="/" /> */}
              </>
            )}
            {/* <div></div> */}
          </div>
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
