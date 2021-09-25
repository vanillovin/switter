import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    if (sweet === '') {
      return;
    }
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
      // console.log('finishedEvent', finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

  //  <form onSubmit={onSubmit} className="factoryForm">
  //     <div>
  //       <input
  //         className="factoryInput__input"
  //         value={sweet}
  //         onChange={onChange}
  //         type="text"
  //         placeholder="What's on your mind"
  //         maxLength={120}
  //       />
  //       <input type="file" accept="image/*" onChange={onFileChange} />
  //       <input type="submit" value="Sweet" />
  //     </div>
  //     {attachment && (
  //       <div>
  //         <img src={attachment} alt="imgs" width="50px" height="50px" />
  //         <button onClick={onClearAttachment}>Clear</button>
  //       </div>
  //     )}
  //   </form>

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What kind of sweet thoughts are you having?"
          maxLength={120}
        />
        <input
          type="submit"
          value="&rarr;"
          className="factoryInput__arrow"
          onSubmit={onsubmit}
        />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            alt="img"
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default SweetFactory;
