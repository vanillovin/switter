import React, { useRef } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaComment, FaFacebook, FaHeart, FaShare, FaTwitter } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import useToggle from 'hooks/useToggle';
import { handleCopy, shareSns } from 'utils';

function SweetActionButtons({
  type,
  id,
  likes,
  liked,
  comments,
  handleLikeSweet,
  handleAddComment,
}) {
  const toggleRef = useRef();
  const [toggle, onToggleChange] = useToggle(toggleRef);
  return (
    <div className={`bottom b${type}`}>
      <button title="마음에 들어요" onClick={handleLikeSweet}>
        {type === 'sweet' ? (
          <>
            <FaHeart color={liked ? '#e05d5d' : ''} />
            <span>{` ${likes.length}`}</span>
          </>
        ) : liked ? (
          <AiFillHeart />
        ) : (
          <AiOutlineHeart />
        )}
      </button>
      <button title="답글" onClick={handleAddComment}>
        <FaComment />
        {type === 'sweet' && <span>{` ${comments.length}`}</span>}
      </button>
      <div className="toggles" ref={toggleRef} title="공유하기">
        <button className="shareBtn" onClick={onToggleChange}>
          <FaShare />
        </button>
        {toggle && (
          <div title="링크 복사하기" className="buttons">
            <button onClick={() => handleCopy(id)}>
              <FiLink /> 스윗 링크 복사하기
            </button>
            <button title="트위터에 공유하기" onClick={() => shareSns('twitter', id)}>
              <FaTwitter /> 트위터에 공유하기
            </button>
            <button title="페이스북에 공유하기" onClick={() => shareSns('facebook', id)}>
              <FaFacebook /> 페이스북에 공유하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SweetActionButtons;
