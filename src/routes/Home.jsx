import React, { useEffect } from 'react';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';
import { useDispatch, useSelector } from 'react-redux';
import { clearSweets, getSweets } from 'services/actions/sweetsAction';
import { getUsersProfilePhoto } from 'services/actions/usersAction';

function Home({ userObj, darkMode }) {
  const { loading, data: sweets, error } = useSelector((state) => state.sweetsReducer);
  // console.log('Home, { loading:', loading, ', data:', sweets, ', error:', error, ' }');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSweets());
    dispatch(getUsersProfilePhoto());
    return () => {
      dispatch(clearSweets());
    };
  }, [dispatch]);

  if (error) return <div>에러 발생! {error}</div>;

  return !loading ? (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory userObj={userObj} darkMode={darkMode} />
      <div style={{ marginTop: 30 }} className="sweet-container">
        {sweets?.map((sweet) => (
          <Sweet
            key={sweet.id}
            userObj={userObj}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Home;
