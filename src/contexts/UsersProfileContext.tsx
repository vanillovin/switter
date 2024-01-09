import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import {
  fetchUsersProfileData,
  fetchUsersProfilePhoto,
} from '../services/firebase/userService';

const UsersProfileContext = createContext();

const UsersProfileProvider = ({ children }: PropsWithChildren) => {
  const [usersProfileData, setUsersProfileData] = useState();
  const [usersProfilePhoto, setUsersProfilePhoto] = useState();
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchUsersProfilePhoto(
  //     (doc) => {
  //       // console.log('fetchUsersProfilePhoto res', doc.data());
  //       setUsersProfilePhoto(doc.data());
  //     },
  //     (err) => {
  //       console.log('fetchUsersProfilePhoto error', err);
  //     }
  //   );

  //   fetchUsersProfileData(
  //     (doc) => {
  //       // console.log('fetchUsersProfileData res', doc.data());
  //       setUsersProfileData(doc.data());
  //     },
  //     (err) => {
  //       console.log('fetchUsersProfileData error', err);
  //     }
  //   );
  // }, []);

  return (
    <UsersProfileContext.Provider value={{ usersProfilePhoto, usersProfileData }}>
      {children}
    </UsersProfileContext.Provider>
  );
};

export { UsersProfileContext, UsersProfileProvider };
