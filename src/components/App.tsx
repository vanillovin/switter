import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import Home from '../routes/Home';
import LoadingScreen from './LoadingScreen';
import { authService } from '../services/firebase/firebaseConfig';
import { useTheme } from '../contexts/ThemeProvider';
import { userAtom } from '../atoms/userAtom';
import { saveUserToLocalStorage } from '../utils/storage';

function App() {
  const [loading, setLoading] = useState(true);
  const setUser = useSetAtom(userAtom);
  const { darkMode } = useTheme();

  const init = async () => {
    await authService.authStateReady().then((res) => console.log('authStateReady', res));
    setLoading(false);
  };

  useEffect(() => {
    init();
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // console.log('App user', user);
        const userData = {
          email: user.email!,
          displayName: user.displayName!,
          uid: user.uid!,
          profileImageURL: user.photoURL!,
          // updateProfile: (args) => user.updateProfile(args),
        };
        saveUserToLocalStorage(userData);
        setUser(userData);
      } else {
        // User is signed out
        localStorage.removeItem('user'); // 로컬 스토리지에서 유저 정보 제거
        setUser(null);
      }
    });
  }, [setUser]);

  // firebase의 정보를 가지고 react를 업데이트
  // function refreshUser() {
  //   const user = authService.currentUser;
  //   setUser({
  //     email: user.email,
  //     displayName: user.displayName,
  //     uid: user.uid,
  //     photoURL: user.photoURL,
  //     updateProfile: (args) => user.updateProfile(args),
  //   });
  // }

  return (
    <div className={darkMode ? 'right dark' : 'right'}>
      {!loading ? <Home /> : <LoadingScreen />}
    </div>
  );
}

export default App;
