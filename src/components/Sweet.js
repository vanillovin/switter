import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

const Sweet = ({ sweetObj, isOwner }) => {
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
    // console.log('sweetObj', sweetObj, '/ newSweet', newSweet);
    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      text: newSweet,
    });
    setEditing(false);
  };

  const onChange = ({ target: { value } }) => setNewSweet(value);

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && (
            <img src={sweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
