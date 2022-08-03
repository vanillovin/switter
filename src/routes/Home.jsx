import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';
import { clearSweets, fetchSweets } from 'services/sweets/actions';

function Home({ userObj, darkMode }) {
  const { loading, data: sweets, error } = useSelector((state) => state.sweets);
  // console.log('Home, { loading:', loading, ', data:', sweets, ', error:', error, ' }');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSweets());
    return () => {
      dispatch(clearSweets());
    };
  }, [dispatch]);

  if (error) return <div>에러 발생! {error}</div>;

  return !loading ? (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory userObj={userObj} darkMode={darkMode} />
      <div className="sweet-container" style={{ marginTop: 30 }}>
        {sweets?.map((sweet) => (
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
    <div>loading...</div>
  );
}

export default Home;
