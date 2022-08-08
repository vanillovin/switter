import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService } from 'services/firebase/fbase';
import { onAuthStateChanged } from 'firebase/auth';
import { ModalProvider } from 'contexts/ModalContext';
import { UsersProfileProvider } from 'contexts/UsersProfileContext';

function App() {
  // console.log('유저의 로그인 여부', authService.currentUser);
  const [init, setInit] = useState(false); // flase면 router 숨기기
  // userObj의 제일 처음 출발점!
  const [userObj, setUserObj] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 처음 시작할 때. 컴포넌트가 mount 될 때
  useEffect(() => {
    // 사용자의 로그인 상태의 변화를 관찰하는 관찰자 추가
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // console.log('App user', user);
        setUserObj({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        // User is signed out
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // firebase의 정보를 가지고 react를 업데이트
  const refreshUser = () => {
    const user = authService.currentUser;
    // console.log('refreshUser! user', user);
    setUserObj({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  const onDarkMode = () => {
    darkMode
      ? (document.body.style = 'background-color: #fff8e5')
      : (document.body.style = 'background-color: #193446');
    setDarkMode(!darkMode);
  };

  return (
    <UsersProfileProvider>
      <ModalProvider>
        {init ? (
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            darkMode={darkMode}
            onDarkMode={onDarkMode}
          />
        ) : (
          <div style={{ marginTop: 10 }}>Initializing....</div>
        )}
        {/* <footer>&copy; {new Date().getFullYear()} Switter</footer> */}
      </ModalProvider>
    </UsersProfileProvider>
  );
}

export default App;
