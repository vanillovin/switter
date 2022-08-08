import React, { useEffect, useState } from 'react';
import Sweet from 'components/sweet/Sweet';
import SweetFactory from 'components/sweet/SweetFactory';
import { fetchSweets } from 'services/sweets';
import Loading from 'components/Loading';

const initialSweets = {
  loading: true,
  data: null,
  error: null,
};

function Home({ userObj, darkMode }) {
  const [sweets, setSweets] = useState(initialSweets);
  const { loading, data, error } = sweets;

  const clearSweets = () => setSweets(initialSweets);

  useEffect(() => {
    fetchSweets(
      (snapshot) => {
        const sweets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSweets((prev) => ({
          ...prev,
          loading: false,
          data: sweets,
        }));
      },
      (err) => {
        console.log('fetchSweets error', err);
        setSweets((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );

    return () => {
      fetchSweets();
      clearSweets();
    };
  }, []);

  return !loading ? (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory userObj={userObj} darkMode={darkMode} />
      <div className="sweet-container" style={{ marginTop: 30 }}>
        {data?.map((sweet) => (
          <Sweet
            key={sweet.id}
            userObj={userObj}
            sweet={sweet}
            isOwner={sweet.creatorId === userObj.uid}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
