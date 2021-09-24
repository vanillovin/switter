import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log('유저의 로그인 여부', authService.currentUser);
  const [init, setInit] = useState(false); // flase면 router 숨기기
  const [userObj, setUserObj] = useState(null);

  // 처음 시작할 때. 컴포넌트가 mount 될 때
  useEffect(() => {
    // 사용자의 로그인 상태의 변화를 관찰하는 관찰자 추가
    onAuthStateChanged(authService, (user) => {
      console.log('App user', user);
      if (user) {
        setUserObj(user);
      } else {
        // User is signed out
        console.log('not user');
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <div>Initializing....</div>
      )}

      {/* <footer>&copy; {new Date().getFullYear()} Switter</footer> */}
    </>
  );
}

export default App;
