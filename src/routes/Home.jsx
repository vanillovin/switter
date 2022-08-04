import React, { useEffect, useState } from 'react';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';
import { fetchSweets } from 'services/sweets';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { fetchUsersProfilePhoto } from 'services/users';

const initialSweets = {
  loading: true,
  data: null,
  error: null,
};

function Home({ userObj, darkMode }) {
  const [usersProfilePhoto, setUsersProfilePhoto] = useState({});
  const [sweets, setSweets] = useState(initialSweets);
  const { loading, data, error } = sweets;

  const clearUsersProfilePhoto = () => setUsersProfilePhoto({});
  const clearSweets = () => setSweets(initialSweets);

  useEffect(() => {
    fetchUsersProfilePhoto(
      (doc) => {
        // console.log('fetchUsersProfilePhoto res', doc.data());
        setUsersProfilePhoto(doc.data());
      },
      (err) => {
        console.log('fetchUsersProfilePhoto error', err);
      }
    );

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
      fetchUsersProfilePhoto();
      clearSweets();
      clearUsersProfilePhoto();
    };
  }, []);

  if (error) return <Error message={error} />;

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
            profilePhoto={usersProfilePhoto[sweet.creatorId]}
          />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
