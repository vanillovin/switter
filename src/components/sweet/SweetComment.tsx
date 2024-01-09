import { useAtomValue } from 'jotai';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { Comment } from '../../types/Sweet';
import { displayedAt } from '../../utils/utils';
import { userAtom } from '../../atoms/userAtom';

type SweetCommentProps = {
  comment: Comment;
  deleteComment: () => void;
};

function SweetComment({ comment, deleteComment }: SweetCommentProps) {
  const user = useAtomValue(userAtom);

  return (
    <div className="comment" key={comment.createdAt}>
      <div className="hello">
        <div className="info">
          {/* <img src={comment.profileImageURL} /> */}
          <span className="dname">{comment.user.displayName || '♥'}</span>
          <span className="mini">{displayedAt(comment.createdAt)}</span>
        </div>
        {user && user.uid === comment.user.uid && (
          <button className="delcommentBtn" onClick={deleteComment}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      <div className="ctext">{comment.content}</div>
      {/* <SweetActionButtons
        type="comment"
        id="id"
        likes={comment.likes}
        liked={new Set(comment.likes).has(user.uid)}
        comments={comment.nestedComments}
        handleLikeSweet={handleLikeComment}
        handleAddComment={handleModal}
      /> */}
      {/* {false && (
        <SweetNestedComments
          nestedComments={comment.nestedComments.sort(
            (a, b) => b.createdAt - a.createdAt
          )}
          isOwner={true}
          handleAddNestedComment={() => {}}
          handleDeleteNestedComment={() => {}}
        />
      )} */}
    </div>
  );
}

export default SweetComment;
