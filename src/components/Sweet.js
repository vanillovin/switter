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
  faAddressBook,
  faPlus,
  faMinus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faXbox } from '@fortawesome/free-brands-svg-icons';

const Sweet = ({ userObj, sweetObj, isOwner, darkMode }) => {
  console.log('Sweet sweetObj', sweetObj);
  const comments = sweetObj.comments.sort((a, b) => b.id - a.id);

  const [text, setText] = useState({
    sweet: sweetObj.text,
    comment: '',
  });
  const { sweet, comment } = text;

  const [editing, setEditing] = useState(false);
  // 이름변경하기
  const [test, setTest] = useState(false);

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

  const toggleEditing = (e) => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('sweetObj', sweetObj, '/ newSweet', sweet);
    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      text: sweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }

  // const getCreatedAt = () => {
  //   const month = new Date(sweetObj.createdAt).getMonth() + 1;
  //   const date = new Date(sweetObj.createdAt).getDate();
  //   const hour = new Date(sweetObj.createdAt).getHours();
  //   const min = new Date(sweetObj.createdAt).getMinutes();
  //   return `${displayedAt(sweetObj.createdAt)}`;
  // };

  const like = async () => {
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

  const getCount = (name) => {
    let count = 0;
    if (name === 'likes') {
      for (let i = 0; i < sweetObj.likes.length; i++) {
        count += 1;
      }
      return count;
    } else if (name === 'comments') {
      for (let i = 0; i < sweetObj.comments.length; i++) {
        count += 1;
      }
      return count;
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment !== '') {
      await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
        comments: [
          ...sweetObj.comments,
          {
            id: sweetObj.comments.length + 1,
            createdAt: Date.now(),
            name: userObj.displayName,
            text: comment,
          },
        ],
      });
      setText({
        ...text,
        comment: '',
      });
    }
  };

  const deleteComment = async (id) => {
    // console.log('delete', id);
    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      comments: sweetObj.comments.filter((comment) => comment.createdAt !== id),
    });
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
              name="sweet"
              required
              autoFocus
              value={sweet}
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" className="formBtn" />
          </form>
          <span
            onClick={(prev) => setEditing(!prev)}
            className="formBtn cancelBtn"
          >
            Cancel
          </span>
        </>
      ) : (
        <>
          <div className="hello">
            <div className="info">
              <span className="dname">{sweetObj.dName || '♥'}</span>
              <span className="mini">{displayedAt(sweetObj.createdAt)}</span>
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
          <>
            <div className="bottom">
              <button onClick={like}>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: sweetObj.likes.includes(userObj.uid)
                      ? '#e05d5d'
                      : '#d3d3d3',
                  }}
                />
                <span>{' ' + getCount('likes')}</span>
              </button>
              <button onClick={() => setTest(!test)}>
                <FontAwesomeIcon icon={faComment} color="#d3d3d3" />
                <span>{' ' + getCount('comments')}</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faShare} color="#d3d3d3" />
              </button>
            </div>
            {/* comments */}
            <div className="comments-container">
              {test && (
                <div style={{ marginTop: 10 }}>
                  <form className="commentForm" onSubmit={addComment}>
                    <div className="commentInput__container">
                      <input
                        className="commentInput__input"
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={onChange}
                        placeholder="comment"
                        required
                        autoFocus
                      />
                      <input
                        className="commentInput__arrow"
                        type="submit"
                        value="&rarr;"
                        onSubmit={addComment}
                      />
                    </div>
                  </form>
                  <div className="comments">
                    {comments.map((comment) => (
                      <div className="comment" key={comment.createdAt}>
                        <div className="hello">
                          <div className="info">
                            <span className="dname">{comment.name}</span>
                            <span className="mini">
                              {displayedAt(comment.createdAt)}
                            </span>
                          </div>
                          <button
                            className="delcommentBtn"
                            onClick={() => {
                              window.confirm(
                                'Are you going to delete the comments?'
                              ) && deleteComment(comment.createdAt);
                            }}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                        <div className="ctext">{comment.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Sweet;
