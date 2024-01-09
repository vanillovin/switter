export type Like = {
  id: string;
  sweetId: string;
  uid: string;
  createdAt: number;
  displayName: string;
};

export type Comment = {
  id: string;
  sweetId: string;
  content: string;
  createdAt: number;
  likes: Like[];
  user: {
    displayName: string;
    email: string;
    uid: string;
    profileImageURL: string;
  };
  nestedComments: {
    uid: string;
    createdAt: number;
    displayName: string;
    content: string;
    profileImageURL: string;
  }[];
};

export type SweetT = {
  attachmentURL: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  user: {
    uid: string;
    email: string;
    displayName: string;
    profileImageURL: string;
  };
  comments: Comment[];
  likes: Like[];
};

export type Sweet = {
  id: string;
  attachmentURL: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  user: {
    uid: string;
    email: string;
    displayName: string;
    profileImageURL: string;
  };
  comments: Comment[];
  likes: Like[];
};
