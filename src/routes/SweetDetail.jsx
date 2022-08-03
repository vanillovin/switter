import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaComment, FaPencilAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';

import useToggle from 'hooks/useToggle';
import SweetShareButton from '../components/SweetShareButton';
import SweetComments from '../components/SweetComments';
import SweetEdit from 'components/SweetEdit';
import { fetchSweet } from 'services/sweets';
import Loading from 'components/Loading';
import Error from 'components/Error';

const regex = /[\s\uFEFF\xA0]+$/gi;

function SweetDetail({ userObj, darkMode }) {
  const [sweet, setSweet] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const { loading, data, error } = sweet;

  const topToggleRef = useRef();
  const botToggleRef = useRef();
  const params = useParams();
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [topToggle, onTopToggleChange] = useToggle(topToggleRef);
  const [botToggle, onBotToggleChange] = useToggle(botToggleRef);

  const toggleEditing = () => setEditing((prev) => !prev);

  useEffect(() => {
    fetchSweet(
      params.id,
      (doc) => {
        // console.log(doc.data());
        setSweet((prev) => ({
          ...prev,
          loading: false,
          data: doc.data(),
        }));
      },
      (err) => {
        console.log('fetchSweet error', err);
        setSweet((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );

    return () => {
      fetchSweet();
    };
  }, [params.id]);

  const isOwner = sweet?.creatorId === userObj.uid;

  const handleDeleteSweet = () => {};

  const handleSweetLike = async () => {};

  const handleUpdateSweet = (text) => {};

  const handleAddComment = (comment, clearComment) => {
    if (comment === '') return;
  };

  const handleDeleteComment = async (cid) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
  };

  if (error) <Error message={error} />;

  return !loading ? (
    <div className={darkMode ? 'sweetDetailContainer dark' : 'sweetDetailContainer'}>
      <div className="sweetDetailTop">
        <button onClick={() => history.push('/')}>←</button>
        스레드
      </div>
      <div className="sweetDetail">
        {editing ? (
          <SweetEdit
            text={data?.text}
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
                  src={data?.photoURL || `${process.env.PUBLIC_URL}/default-profile.png`}
                />
                <div className="text">
                  <span className="dname">{data?.dName || '♥'}</span>
                  <span className="email">@{data?.email?.split('@')[0]}</span>
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
            <p className="sweetDetailContent">{data?.text.replace(regex, '')}</p>
            {sweet?.attachmentUrl && <img alt="img" src={data?.attachmentUrl} />}
          </>
        )}
        <div className="sweetDetailInfo">
          <div className="commentText">
            <span>{data?.comments?.length}</span> 답글
          </div>
          <div>
            <span>{data?.likes?.length}</span> 마음에 들어요
          </div>
        </div>

        <div className="sweetDetailActions">
          <button title="마음에 들어요" onClick={handleSweetLike}>
            {data?.likes?.includes(userObj.uid) ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button title="답글">
            <FaComment />
          </button>
          <SweetShareButton
            toggle={botToggle}
            toggleRef={botToggleRef}
            onToggleChange={onBotToggleChange}
            sweetId={data?.id}
          />
        </div>

        <SweetComments
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          comments={data?.comments}
          userObj={userObj}
        />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default SweetDetail;
