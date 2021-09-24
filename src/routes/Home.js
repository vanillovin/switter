import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import Sweet from 'components/Sweet';

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState('');

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
  //     };
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
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('something happened-read, delete, update..');
      // map은 rerender하지 않음?
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('sweetArray', sweetArray);
      setSweets(sweetArray);
      console.log('Current sweets in CA: ', sweetArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      // 파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, 'data_url');
      console.log(uploadFile);
      // storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    // 트윗할 때, 메시지와 사진도 같이 firestore에 생성
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'sweets'), sweetObj);
    setSweet('');
    setAttachment('');

    // try {
    //   const docRef = await addDoc(collection(dbService, 'sweets'), {
    //     text: sweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    //   console.log('Document written with ID: ', docRef.id);
    // } catch (error) {
    //   console.error('Error adding document: ', error);
    // }
    // setSweet('');
  };

  const onChange = ({ target: { value } }) => {
    setSweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // fileReader API 파일 이름을 읽음
    reader.onloadend = (finishedEvent) => {
      console.log('finishedEvent', finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Sweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="imgs" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
