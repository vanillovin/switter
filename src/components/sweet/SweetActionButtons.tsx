import { FaComment } from 'react-icons/fa';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

import DropdownMenuDemo from '../DropdownMenu';

type SweetActionButtonsProps = {
  id: string;
  isLiked: boolean;
  likesLength: number;
  commentsLength: number;
  handleLikeSweet: () => void;
  handleAddComment: () => void;
};

function SweetActionButtons({
  id,
  likesLength,
  isLiked,
  commentsLength,
  handleLikeSweet,
  handleAddComment,
}: SweetActionButtonsProps) {
  return (
    <div className={`bottom`}>
      <button onClick={handleLikeSweet} style={{ display: 'flex', alignItems: 'center' }}>
        {isLiked ? <HeartFilledIcon /> : <HeartIcon />}
        <span>{likesLength}</span>
      </button>

      <button onClick={handleAddComment}>
        <FaComment />
        <span>{commentsLength}</span>
      </button>

      <DropdownMenuDemo
        copySweetLink={() => handleCopy(id)}
        shareToTitter={() => shareSns('twitter', id)}
      />
    </div>
  );
}

export default SweetActionButtons;

function handleCopy(sweetId: string) {
  navigator.clipboard.writeText(`${'SITE_URL'}/${sweetId}`);
  alert('클립보드로 복사됐습니다');
}

function shareSns(sns: 'twitter' | 'facebook', id: string) {
  const title = 'Switter';

  if (sns === 'twitter') {
    window.open(
      `https://twitter.com/intent/tweet?text=${title}&url=${'SITE_URL'}/%23/sweet/${id}`,
      'popup제목',
      'width=500, height=400, scrollbars=yes'
    );
  } else if (sns === 'facebook') {
    window.open(
      `http://www.facebook.com/sharer/sharer.php?u=${'SITE_URL'}/%23/sweet/${id}`
    );
  } else {
    return;
  }
}
