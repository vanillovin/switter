import React from 'react';
import { FaFacebook, FaShare, FaTwitter } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { shareSns } from 'utils';

const handleCopy = (sweetId) => {
  navigator.clipboard.writeText(
    `https://vanillovin.github.io/switter/#/sweet/${sweetId}`
  );
  alert('클립보드로 복사됐습니다');
};

function SweetShareButton({ toggle, toggleRef, onToggleChange, sweetId }) {
  return (
    <div className="toggles" ref={toggleRef} title="공유하기">
      <button onClick={onToggleChange}>
        <FaShare />
      </button>
      {toggle && (
        <div title="링크 복사하기" className="buttons">
          <button onClick={() => handleCopy(sweetId)}>
            <FiLink /> 스윗 링크 복사하기
          </button>
          <button title="트위터에 공유하기" onClick={() => shareSns('twitter', sweetId)}>
            <FaTwitter /> 트위터에 공유하기
          </button>
          <button
            title="페이스북에 공유하기"
            onClick={() => shareSns('facebook', sweetId)}
          >
            <FaFacebook /> 페이스북에 공유하기
          </button>
        </div>
      )}
    </div>
  );
}

export default SweetShareButton;
