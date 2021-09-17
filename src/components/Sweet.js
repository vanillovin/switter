import React, { useState } from 'react';
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

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
