import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from '../components/Navigation';
import Profile from '../routes/Profile';
import Message from '../routes/Message';
import SweetDetail from '../routes/SweetDetail';

interface AppRouterProps {
  refreshUser: () => void;
  isLoggedIn: boolean;
  userObj: { displayName: string };
  darkMode: boolean;
  onDarkMode: () => void;
}

function AppRouter({
  refreshUser,
  isLoggedIn,
  userObj,
  darkMode,
  onDarkMode,
}: AppRouterProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <BrowserRouter>
      <Routes>
        <div className={darkMode ? 'test dark' : 'test'}>
          <div className={darkMode ? 'left dark' : 'left'}>
            {isLoggedIn && (
              <Navigation userObj={userObj} darkMode={darkMode} onDarkMode={onDarkMode} />
            )}
          </div>
          {isLoggedIn ? (
            <div className={darkMode ? 'right dark' : 'right'}>
              <Route
                path="/"
                element={
                  <Home userObj={userObj} darkMode={darkMode} onDarkMode={onDarkMode} />
                }
              />
              <Route
                path="/sweet/:id"
                element={<SweetDetail userObj={userObj} darkMode={darkMode} />}
              />
              <Route
                path="/profile/:uid"
                element={
                  <Profile
                    userObj={userObj}
                    refreshUser={refreshUser}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/profile/:uid/*"
                element={
                  <Profile
                    userObj={userObj}
                    refreshUser={refreshUser}
                    darkMode={darkMode}
                  />
                }
              />
              <Route path="/msg" element={<Message userName={userObj.displayName} />} />
            </div>
          ) : (
            <Route path="/" element={<Auth darkMode={darkMode} />} />
          )}
        </div>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
