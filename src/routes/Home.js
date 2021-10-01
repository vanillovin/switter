import React, { useState, useEffect } from 'react';
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Sweet from 'components/Sweet';
import SweetFactory from 'components/SweetFactory';

const Home = ({ userObj, darkMode }) => {
  // console.log('Home userObj', userObj);
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    // onSnapshot은 데이터베이스의 변화를 실시간으로 알려주는 기능
    // 실시간으로 데이터를 데이터베이스에서 가져오기 (쿼리 스냅샷 차이)
    // snapshot은 우리가 가진 query와 같은 것 docs를 갖고 있음
    const q = query(
      collection(getFirestore(), 'sweets'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('something happened-read, delete, update..');
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        likes: doc.data().likes,
        comments: doc.data().comments,
        ...doc.data(),
      }));
      setSweets(sweetArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
