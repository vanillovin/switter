import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Sweet = ({ sweetObj, isOwner }) => {
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
      await deleteDoc(doc(dbService, `sweets/${sweetObj.id}`));
      await deleteObject(ref(storageService, sweetObj.attachmentUrl));
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

  // const getUserEmail = () => sweetObj.email.split('@')[0];

  return (
    <div className="sweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container sweetEdit">
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
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
              <span style={{ fontWeight: 'bold', marginRight: 4 }}>
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
        </>
      )}
    </div>
  );
};

export default Sweet;
