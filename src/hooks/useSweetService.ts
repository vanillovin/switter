import { useCallback } from 'react';
import { useAtomValue } from 'jotai';

import {
  addSweetComment,
  createSweet,
  deleteSweet,
  deleteSweetComment,
  getUploadImageURL,
  toggleLikeSweet,
  updateSweetContent,
} from '../services/firebase/sweetService';
import { userAtom } from '../atoms/userAtom';
import { useModal } from '../contexts/ModalContext';
import type { User } from '../types/User';
import type { Comment, Sweet } from '../types/Sweet';
import { updateProfileTimeline } from '../services/firebase/userService';
import { getUUID, isUserConfirmed } from '../utils/utils';
import { defaultProfileImageURL } from '../components/auth/AuthForm';

type MessageType = 'create_sweet' | 'like' | 'create_comment';

type Message = { title: string; content: string };

function useSweetService() {
  const { openModal } = useModal();
  const user = useAtomValue(userAtom);

  const showNotUserModal = useCallback(
    (type: MessageType) => {
      const message = messages[type];
      openModal(message.title, message.content);
    },
    [openModal]
  );

  const createNewSweet = async (user: User, attachment: string, content: string) => {
    let attachmentURL = '';
    if (attachment !== '') {
      attachmentURL = (await getUploadImageURL(user.uid, attachment)) ?? '';
    }

    return {
      content,
      attachmentURL,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        profileImageURL: user.profileImageURL,
      },
      likes: [],
      comments: [],
    };
  };

  const onCreateSweet = async (
    attachmentURL: string,
    content: string,
    callback: () => void
  ) => {
    if (!user) return showNotUserModal('create_sweet');
    try {
      const newSweet = await createNewSweet(user, attachmentURL, content);
      const { id } = await createSweet(newSweet);
      callback();
      updateProfileTimeline('sweets', user.uid, 'create', {
        id: getUUID(),
        sweetId: id,
        uid: user.uid,
        content: newSweet.content,
        createdAt: newSweet.createdAt,
        displayName: user.displayName,
        profileImageURL: user.profileImageURL ?? defaultProfileImageURL,
        attachmentURL,
      });
    } catch (err) {
      console.log('createSweet or updateProfile err', err);
    }
  };

  const onDeleteSweet = async (sweetId: string, callback?: () => void) => {
    if (user === null) return;
    if (!isUserConfirmed('정말 삭제하시겠습니까?')) return;
    const oldSweet = {
      id: sweetId,
      sweetId,
      uid: '',
      content: '',
      createdAt: 0,
      displayName: user.displayName,
      profileImageURL: user.profileImageURL,
      attachmentURL: '',
    };
    try {
      await deleteSweet(sweetId);
      updateProfileTimeline('sweets', user.uid, 'delete', oldSweet);
      if (callback) callback();
    } catch (err) {
      console.error('onDeleteSweet err', err);
    }
  };

  const onUpdateSweet = async (
    sweetId: string,
    attachmentURL: string,
    newContent: string
  ) => {
    if (user === null) return;
    try {
      await updateSweetContent(sweetId, newContent);
      updateProfileTimeline('sweets', user.uid, 'update', {
        id: getUUID(),
        sweetId: sweetId,
        uid: user.uid,
        content: newContent,
        createdAt: Date.now(),
        displayName: user.displayName,
        profileImageURL: user.profileImageURL ?? defaultProfileImageURL,
        attachmentURL,
      });
    } catch (err) {
      console.error('스윗 업데이트 에러 :', err);
    }
  };

  const onToggleLikeSweet = (sweet: Sweet) => {
    if (!user) return showNotUserModal('like');
    const id = getUUID();
    const liked = sweet.likes.find((like) => like.uid === user?.uid);
    const isLiked = Boolean(liked);
    // console.log('onToggleLikeSweet', liked, isLiked, sweet);
    toggleLikeSweet(
      isLiked,
      sweet.id,
      !liked
        ? {
            id,
            sweetId: sweet.id,
            uid: user?.uid,
            createdAt: Date.now(),
            displayName: user?.displayName ?? '무명',
          }
        : liked
    ).then(() => {
      updateProfileTimeline('likes', user.uid, isLiked ? 'delete' : 'create', {
        id: isLiked ? liked?.id : id,
        sweetId: sweet.id,
        uid: user.uid,
        content: sweet.content,
        createdAt: liked?.createdAt ?? Date.now(),
        displayName: user.displayName,
        profileImageURL: user.profileImageURL ?? defaultProfileImageURL,
        attachmentURL: '',
      });
    });
  };

  const onAddComment = (sweetId: string, content: string) => {
    if (!user) return showNotUserModal('create_comment');
    const id = getUUID();
    addSweetComment(sweetId, {
      id,
      sweetId,
      content,
      createdAt: Date.now(),
      user: {
        email: user.email,
        uid: user.uid,
        displayName: user?.displayName || '♥',
        profileImageURL: user.profileImageURL ?? defaultProfileImageURL,
      },
      likes: [],
      nestedComments: [],
    });
    updateProfileTimeline('comments', user.uid, 'create', {
      content,
      sweetId,
      id,
      uid: user.uid,
      createdAt: Date.now(),
      displayName: user.displayName,
      profileImageURL: user.profileImageURL ?? defaultProfileImageURL,
      attachmentURL: '',
    });
  };

  const onDeleteComment = (id: string, sweetId: string, comments: Comment[]) => {
    if (!user) return;
    const filterdComments = comments.filter((comment) => comment.id !== id);
    deleteSweetComment(sweetId, filterdComments).then(() => {
      updateProfileTimeline('comments', user.uid, 'delete', {
        id,
        sweetId,
        content: '',
        uid: user.uid,
        createdAt: Date.now(),
        displayName: user.displayName,
        profileImageURL: user.profileImageURL,
        attachmentURL: '',
      });
    });
  };

  return {
    onToggleLikeSweet,
    onAddComment,
    onDeleteComment,
    onCreateSweet,
    onDeleteSweet,
    onUpdateSweet,
  };
}

export default useSweetService;

const messages: Record<MessageType, Message> = {
  create_sweet: {
    title: '게시물을 작성해 사람들과 소통해 보세요.',
    content: 'Switter에 가입하면 게시물을 작성할 수 있어요!',
  },
  like: {
    title: '게시물에 마음에 들어요로 호감을 표시해보세요',
    content: 'Switter에 가입해 게시물에 하트를 보내세요!',
  },
  create_comment: {
    title: '댓글을 달아 대화에 참여해보세요',
    content: 'Switter에 가입하면 게시물에 답글을 보낼 수 있습니다!',
  },
};
