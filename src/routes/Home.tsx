import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import type { Sweet } from '../types/Sweet';
import { userAtom } from '../atoms/userAtom';
import { useTheme } from '../contexts/ThemeProvider';
import { fetchSweets } from '../services/firebase/sweetService';
import Loading from '../components/LoadingScreen';
import SweetItem from '../components/sweet/SweetItem';
import SweetFactory from '../components/sweet/SweetFactory';

type SweetsState = {
  loading: boolean;
  data: Sweet[] | null;
  error: Error | null;
};

function Home() {
  const user = useAtomValue(userAtom);
  const { darkMode } = useTheme();
  const [sweets, setSweets] = useState<SweetsState>({
    loading: true,
    data: null,
    error: null,
  });
  const { loading, data } = sweets;

  // const clearSweets = () => setSweets(initialSweets);

  useEffect(() => {
    fetchSweets(
      (snapshot) => {
        const sweets = snapshot.docs.map((doc) => {
          // console.log(doc.id, doc.data());
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setSweets((prev: any) => ({
          ...prev,
          loading: false,
          data: sweets,
        }));
      },
      (err) => {
        setSweets((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );

    // return () => {
    //   fetchSweets();
    //   clearSweets();
    // };
  }, []);

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory userObj={user} darkMode={darkMode} />
      <div className="sweet-container" style={{ marginTop: 30 }}>
        {data?.map((sweet, i) => (
          <SweetItem key={i} sweet={sweet} />
        ))}
      </div>
    </div>
  );
}

export default Home;
