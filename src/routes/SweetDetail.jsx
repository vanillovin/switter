import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaComment, FaPencilAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';

import useClickToggleOutside from 'hooks/useToggle';
import SweetShareButton from '../components/SweetShareButton';
import SweetComments from '../components/SweetComments';
import { useDispatch, useSelector } from 'react-redux';
import { clearSweet, getSweetsById } from 'services/actions/sweetsAction';

function SweetDetail({ userObj, darkMode }) {
  const topToggleRef = useRef();
  const botToggleRef = useRef();
  const params = useParams();
  const history = useHistory();
  const [topToggle, onTopToggleChange] = useClickToggleOutside(topToggleRef);
  const [botToggle, onBotToggleChange] = useClickToggleOutside(botToggleRef);

  const {
    loading,
    data: sweet,
    error,
  } = useSelector((state) => state.sweetsReducer.sweet);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSweetsById(params.id));
  }, [dispatch, params.id]);

  const isOwner = sweet?.creatorId === userObj.uid;

  // console.log('Detail', '{loading:', loading, ', data:', sweet, ', error:', error, '}');
  // const { data } = useSelector((state) => state.sweetsReducer.sweets);
  // console.log('Detail - Home data:', data);

  if (error) return <div>에러 발생! {error}</div>;

  return !loading ? (
    <div className={darkMode ? 'sweetDetailContainer dark' : 'sweetDetailContainer'}>
      <div className="sweetDetailTop">
        <button onClick={() => history.push('/')}>←</button>
        스레드
      </div>
      <div className="sweetDetail">
        <div className="sweetDetailTopInfo" onClick={() => {}}>
          <div className="userInfo">
            <div className="profile"></div>
            <div className="text">
              <span className="">{sweet?.dName || '♥'}</span>
              <span className="">@{sweet?.email?.split('@')[0]}</span>
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
                    <button onClick={() => {}}>
                      <FaTrash /> 삭제하기
                    </button>
                    <button onClick={() => {}}>
                      <FaPencilAlt /> 수정하기
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <p className="sweetDetailContent">{sweet?.text}</p>
        {sweet?.attachmentUrl && <img alt="img" src={sweet?.attachmentUrl} />}

        <div className="sweetDetailInfo">
          <div className="commentText">
            <span>{sweet?.comments?.length}</span> 답글
          </div>
          <div>
            <span>{sweet?.likes?.length}</span> 마음에 들어요
          </div>
        </div>

        <div className="sweetDetailActions">
          <button title="마음에 들어요" onClick={() => {}}>
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
          handleAddComment={() => {}}
          handleDeleteComment={() => {}}
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
