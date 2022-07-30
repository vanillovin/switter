import React, { useEffect } from 'react';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';
import { useDispatch, useSelector } from 'react-redux';
import sweetsData from 'services/actions/sweetsAction';

const Home = ({ userObj, darkMode }) => {
  const sweets = useSelector((state) => state.sweetsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sweetsData());
  }, [dispatch]);

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory userObj={userObj} darkMode={darkMode} />
      <div style={{ marginTop: 30 }} className="sweet-container">
        {sweets.map((sweet) => (
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
  );
};

export default Home;
