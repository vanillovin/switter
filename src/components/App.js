import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(authService.currentUser); // 유저의 로그인 여부
  const [init, setInit] = useState(false); // flase면 router 숨기기
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 처음 시작할 때. 컴포넌트가 mount 될 때
  useEffect(() => {
    // 사용자의 로그인 상태의 변화를 관찰하는 관찰자 추가
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        <div>Initializing....</div>
      )}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
