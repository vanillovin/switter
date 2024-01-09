export type TimelineSweet = {
  id: string;
  sweetId: string;
  createdAt: number;
  content: string;
  uid: string;
  displayName: string;
  profileImageURL: string;
  attachmentURL: string;
};

type UserSummary = {
  uid: string;
  displayName: string;
  profileImageURL: string;
  email: string;
};

export type Profile = {
  uid: string;
  displayName: string;
  email: string;
  profileImageURL: string;
  about: string;
  joinedDate: number;
  followers: UserSummary[];
  following: UserSummary[];
  comments: TimelineSweet[];
  likes: TimelineSweet[];
  sweets: TimelineSweet[];
};
