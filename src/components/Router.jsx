import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import Message from 'components/Message';
import SweetDetail from '../routes/SweetDetail';

const AppRouter = ({ refreshUser, isLoggedIn, userObj, darkMode, onDarkMode }) => {
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
              <div className={darkMode ? 'right dark' : 'right'}>
                <Route exact path="/">
                  <Home userObj={userObj} darkMode={darkMode} onDarkMode={onDarkMode} />
                </Route>
                <Route exact path="/sweet/:id">
                  <SweetDetail userObj={userObj} darkMode={darkMode} />
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
                <Redirect from="*" to="/" />
              </>
            )}
          </div>
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
