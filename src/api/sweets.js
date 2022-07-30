import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';

export const getSweets = async () => {
  // await sleep(500);
  return [];
};

export const getSweetById = async (id) => {
  const q = query(collection(getFirestore(), 'sweets'), orderBy('createdAt', 'desc'));
  let sweet = {};
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const sweets = snapshot.docs.map((doc) => ({
      id: doc.id,
      likes: doc.data().likes,
      comments: doc.data().comments,
      ...doc.data(),
    }));
    sweet = sweets.filter((sweet) => sweet.id === id)[0];
  });
  return [];
};
