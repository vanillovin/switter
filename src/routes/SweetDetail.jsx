import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaComment, FaPencilAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';

import useToggle from 'hooks/useToggle';
import SweetShareButton from '../components/SweetShareButton';
import SweetComments from '../components/SweetComments';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSweets,
  createSweetComment,
  deleteSweet,
  deleteSweetComment,
  getSweets,
  likeSweet,
  updateSweet,
} from 'services/actions/sweetsAction';
import SweetEdit from 'components/SweetEdit';

function SweetDetail({ userObj, darkMode }) {
  const dispatch = useDispatch();
  const topToggleRef = useRef();
  const botToggleRef = useRef();
  const params = useParams();
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [topToggle, onTopToggleChange] = useToggle(topToggleRef);
  const [botToggle, onBotToggleChange] = useToggle(botToggleRef);

  const toggleEditing = () => setEditing((prev) => !prev);

  const {
    loading,
    data: sweets,
    error,
  } = useSelector((state) => state.sweetsReducer.sweets);

  useEffect(() => {
    dispatch(getSweets());
    return () => {
      dispatch(clearSweets());
    };
  }, [dispatch]);

  const sweet = sweets?.filter((sweet) => sweet.id === params.id)[0];

  const isOwner = sweet?.creatorId === userObj.uid;

  // console.log('Detail', '{loading:', loading, ', data:', sweet, ', error:', error, '}');

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
    dispatch(deleteSweet(sweet.id, sweet.attachmentUrl));
    history.push('/');
  };

  const handleSweetLike = async () => {
    const liked = sweet.likes.includes(userObj.uid);
    dispatch(likeSweet(sweet, liked, userObj.uid));
  };

  const handleUpdateSweet = (text) => {
    dispatch(updateSweet(sweet.id, text));
    setEditing(false);
  };

  const handleAddComment = (comment, clearComment) => {
    if (comment === '') return;
    dispatch(createSweetComment(sweet, userObj, comment));
    clearComment();
  };

  const handleDeleteComment = async (cid) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    // console.log('comment', uid, 'delete comment createdAt', cid);
    dispatch(deleteSweetComment(sweet, cid));
  };

  const regex = /[\s\uFEFF\xA0]+$/gi;

  if (error) return <div>에러 발생! {error}</div>;

  return !loading ? (
    <div className={darkMode ? 'sweetDetailContainer dark' : 'sweetDetailContainer'}>
      <div className="sweetDetailTop">
        <button onClick={() => history.push('/')}>←</button>
        스레드
      </div>
      <div className="sweetDetail">
        {editing ? (
          <SweetEdit
            text={sweet.text}
            onSubmit={handleUpdateSweet}
            closeEdit={() => setEditing(false)}
          />
        ) : (
          <>
            <div className="sweetDetailTopInfo" onClick={() => {}}>
              <div className="userInfo">
                <img
                  alt="profile"
                  className="profile"
                  src={sweet?.photoURL || `${process.env.PUBLIC_URL}/default-profile.png`}
                />
                <div className="text">
                  <span className="dname">{sweet?.dName || '♥'}</span>
                  <span className="email">@{sweet?.email?.split('@')[0]}</span>
                </div>
              </div>
              <div className="rightButtons" ref={topToggleRef}>
                {isOwner && (
                  <>
                    <button onClick={onTopToggleChange}>
                      <FaEllipsisH />
                    </button>
                    {topToggle && (
                      <div className="buttons">
                        <button onClick={handleDeleteSweet}>
                          <FaTrash /> 삭제하기
                        </button>
                        <button onClick={toggleEditing}>
                          <FaPencilAlt /> 수정하기
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <p className="sweetDetailContent">{sweet?.text.replace(regex, '')}</p>
            {sweet?.attachmentUrl && <img alt="img" src={sweet?.attachmentUrl} />}
          </>
        )}
        <div className="sweetDetailInfo">
          <div className="commentText">
            <span>{sweet?.comments?.length}</span> 답글
          </div>
          <div>
            <span>{sweet?.likes?.length}</span> 마음에 들어요
          </div>
        </div>

        <div className="sweetDetailActions">
          <button title="마음에 들어요" onClick={handleSweetLike}>
            {sweet?.likes?.includes(userObj.uid) ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button title="답글">
            <FaComment />
          </button>
          <SweetShareButton
            toggle={botToggle}
            toggleRef={botToggleRef}
            onToggleChange={onBotToggleChange}
            sweetId={sweet?.id}
          />
        </div>

        <SweetComments
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          comments={sweet?.comments}
          userObj={userObj}
        />
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default SweetDetail;
