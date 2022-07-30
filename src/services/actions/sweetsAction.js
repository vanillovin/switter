import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';

const GET_SWEETS = 'GET_SWEETS';

const sweetsData = () => {
  return (dispatch) => {
    try {
      const q = query(collection(getFirestore(), 'sweets'), orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        const sweets = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            likes: doc.data().likes,
            comments: doc.data().comments,
            ...doc.data(),
          };
        });
        dispatch({ type: GET_SWEETS, payload: sweets });
      });
    } catch (e) {
      console.log(e);
    }
  };
};

// const sweetsData = () => {
//   return (dispatch) => {
//     return storageService
//       .collection('sweets')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot((snapshot) => {
//         snapshot.docs.map((doc) => {
//           const sweets = {
//             id: doc.id,
//             likes: doc.data().likes,
//             comments: doc.data().comments,
//             ...doc.data(),
//           };

//           dispatch({ type: GET_SWEETS, payload: sweets });
//           // if (change.type === 'added') {
//           // }
//           // else if (change.type === 'modified') {
//           //   dispatch(board_save(childData));
//           // } else if (change.type === 'removed') {
//           //   dispatch(board_remove(childData.brdno));
//           // }
//         });
//       });
//   };
// };

export default sweetsData;
