import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

import SweetEdit from './SweetEdit';
import SweetCommentContainer from './SweetCommentContainer';
import SweetActionButtons from './SweetActionButtons';
import { displayedAt } from '../../utils/utils';
import type { Sweet } from '../../types/Sweet';
import { useTheme } from '../../contexts/ThemeProvider';
import { userAtom } from '../../atoms/userAtom';
import useSweetService from '../../hooks/useSweetService';

type SweetItemProps = { sweet: Sweet };

function SweetItem({ sweet }: SweetItemProps) {
  const { darkMode } = useTheme();
  const user = useAtomValue(userAtom);
  const [editing, setEditing] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const comments = sweet.comments.sort((a, b) => b.createdAt - a.createdAt);
  const { onToggleLikeSweet, onDeleteSweet, onUpdateSweet } = useSweetService();

  const toggleEditing = () => setEditing((prev) => !prev);
  const liked = sweet.likes.find((like) => like.uid === user?.uid);
  const isLiked = user ? !!liked : false;

  if (editing)
    return (
      <SweetEdit
        oldContent={sweet.content}
        onSubmit={(newContent: string) =>
          onUpdateSweet(sweet.id, sweet.attachmentURL, newContent)
        }
        closeEdit={() => setEditing(false)}
      />
    );

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'}>
      <>
        <div className="hello">
          <Link className="info" to={`/profile/${sweet.user.uid}`}>
            <img
              alt="profile"
              src={
                sweet.user.profileImageURL ||
                `${import.meta.env.PUBLIC_URL}/default-profile.png`
              }
            />
            <span className="dname">{sweet?.user.displayName || '♥'}</span>
            <span className="mini">{displayedAt(sweet?.createdAt)}</span>
          </Link>
          {user?.uid === sweet.user.uid && (
            <div className="sweet__actions">
              <button onClick={() => onDeleteSweet(sweet.id)}>
                <FaTrash />
              </button>
              <button onClick={toggleEditing}>
                <FaPencilAlt />
              </button>
            </div>
          )}
        </div>
        <Link to={`/sweet/${sweet.id}`} className="sweet__text">
          {sweet.content}
        </Link>
        {sweet.attachmentURL && <img alt="img" src={sweet.attachmentURL} />}
        <>
          <SweetActionButtons
            id={sweet.id}
            isLiked={isLiked}
            likesLength={sweet.likes.length}
            commentsLength={sweet.comments.length}
            handleLikeSweet={() => onToggleLikeSweet(sweet)}
            handleAddComment={() => setAddComment((prev: boolean) => !prev)}
          />
          {addComment && <SweetCommentContainer sweetId={sweet.id} comments={comments} />}
        </>
      </>
    </div>
  );
}

export default SweetItem;
