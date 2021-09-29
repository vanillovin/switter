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
  const [sweets, setSweets] = useState([]);

  // 구식방법/오래된 방식이다(X)
  // 오래된 데이터를 가져온다.새로 생성 / 변경된 데이터는 새로고침해야 반영된다.
  // const getSweets = async () => {
  //   const dbSweets = await getDocs(collection(dbService, 'sweets'));
  //   // console.log(dbSweets);
  //   dbSweets.forEach((doc) => {
  //     // console.log(`${doc.id} => ${doc.data()}`);
  //     const sweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };<div className="container">
  //     // set에 값 대신 함수 전달 시 이전 값에 접근 가능
  //     setSweets((prev) => [sweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // onSnapshot은 데이터베이스의 변화를 실시간으로 알려주는 기능
    // 실시간으로 데이터를 데이터베이스에서 가져오기(쿼리 스냅샷 차이)
    // snapshot은 우리가 가진 query와 같은 것 docs를 갖고 있음
    const q = query(
      collection(getFirestore(), 'sweets'),
      // where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('something happened-read, delete, update..');
      // map은 rerender하지 않음?
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log('sweetArray', sweetArray);
      setSweets(sweetArray);
      // console.log('Current sweets in CA: ', sweetArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <SweetFactory userObj={userObj} darkMode={darkMode} />
      <div style={{ marginTop: 30 }}>
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
