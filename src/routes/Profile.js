import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'fbase';
import { signOut, updateProfile } from '@firebase/auth';
// import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(authService); // auth.signOut();
    history.push('/');
  };

  const onChange = ({ target: { value } }) => {
    setNewDisplayName(value);
  };

  // updateProfile 2 update - displayName, photoURL
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          // Profile updated!
          refreshUser();
        })
        .catch((error) => {
          // An error occurred
        });
    }
  };

  // const getMySweets = async () => {
  //   const q = query(
  //     collection(dbService, 'sweets'),
  //     where('creatorId', '==', userObj.uid) // 필터링
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // };

  // useEffect(() => {
  //   getMySweets();
  // }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName || ''}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    // <>
    //   <form onSubmit={onSubmit}>
    //     <input
    //       onChange={onChange}
    //       type="test"
    //       placeholder="Display name"
    //       value={newDisplayName}
    //     />
    //     <input type="submit" value="Updata Profile" />
    //   </form>
    //   <button onClick={onLogOutClick}>Log Out</button>
    // </>
  );
};

export default Profile;
