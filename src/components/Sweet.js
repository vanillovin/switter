import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPencilAlt,
  faHeart,
  faShare,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

const Sweet = ({ userObj, sweetObj, isOwner, darkMode }) => {
  // console.log('Sweet sweetObj', sweetObj);
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this sweet?');
    // console.log(ok);
    if (ok) {
      // delete sweet
      // await deleteDoc(doc(dbService, 'sweets', sweetObj.id));
      await deleteDoc(doc(dbService, `sweets/${sweetObj.id}`));
      if (sweetObj.attachmentUrl !== '') {
        await deleteObject(ref(storageService, sweetObj.attachmentUrl));
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('sweetObj', sweetObj, '/ newSweet', newSweet);
    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      text: newSweet,
    });
    setEditing(false);
  };

  const onChange = ({ target: { value } }) => setNewSweet(value);

  const getCreatedAt = () => {
    const month = new Date(sweetObj.createdAt).getMonth() + 1;
    const date = new Date(sweetObj.createdAt).getDate();
    return `${month}.${date}`;
  };

  const like = async () => {
    console.log('like');
    const iLike = sweetObj.likes.includes(userObj.uid);
    if (!iLike) {
      await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
        likes: [...sweetObj.likes, userObj.uid],
      });
    } else {
      await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
        likes: sweetObj.likes.filter((user) => user !== userObj.uid),
      });
    }
  };

  const numberOfLikes = () => {
    let count = 0;
    for (let i = 0; i < sweetObj.likes.length; i++) {
      count += 1;
    }
    return count;
  };

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'}>
      {editing ? (
        <>
          <form className="container sweetEdit" onSubmit={onSubmit}>
            <input
              className="formInput"
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              required
              autoFocus
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <div className="hello">
            <div className="info">
              <span
                className="dname"
                style={{ fontWeight: 'bold', marginRight: 4 }}
              >
                {sweetObj.dName || '♥'}
              </span>
              <span
                style={{
                  color: 'gray',
                  fontSize: 10,
                  fontWeight: 400,
                }}
              >
                {getCreatedAt()}
              </span>
            </div>
            {isOwner && (
              <div className="sweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
          <span className="sweet__text">{sweetObj.text}</span>
          {sweetObj.attachmentUrl && (
            <img alt="img" src={sweetObj.attachmentUrl} />
          )}
          <div className="bottom">
            <div className="heart">
              <button onClick={like}>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: sweetObj.likes.includes(userObj.uid)
                      ? '#e05d5d'
                      : '#d3d3d3',
                  }}
                />
                <span>{' ' + numberOfLikes()}</span>
              </button>
            </div>
            <div style={{ padding: 4 }}>
              <FontAwesomeIcon icon={faComment} color="#d3d3d3" />
            </div>
            <div style={{ padding: '4px 2px 4px 4px ' }}>
              <FontAwesomeIcon icon={faShare} color="#d3d3d3" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sweet;
