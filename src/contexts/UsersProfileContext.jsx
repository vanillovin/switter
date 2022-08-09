import React, { createContext, useEffect, useState } from 'react';
import { fetchUsersProfileData, fetchUsersProfilePhoto } from 'services/users';

const UsersProfileContext = createContext();

let UsersProfileProvider = ({ children }) => {
  const [usersProfileData, setUsersProfileData] = useState({
    loading: true,
    data: null,
    error: false,
  });
  const [usersProfilePhoto, setUsersProfilePhoto] = useState();

  useEffect(() => {
    fetchUsersProfilePhoto(
      (doc) => {
        // console.log('fetchUsersProfilePhoto res', doc.data());
        setUsersProfilePhoto(doc.data());
      },
      (err) => {
        console.log('fetchUsersProfilePhoto error', err);
      }
    );

    fetchUsersProfileData(
      (doc) => {
        // console.log('fetchUsersProfileData res', doc.data());
        setUsersProfileData((prev) => ({
          ...prev,
          loading: false,
          data: doc.data(),
        }));
      },
      (err) => {
        console.log('fetchUsersProfileData error', err);
        setUsersProfileData((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );
  }, []);

  return (
    <UsersProfileContext.Provider value={{ usersProfilePhoto, usersProfileData }}>
      {children}
    </UsersProfileContext.Provider>
  );
};

export { UsersProfileContext, UsersProfileProvider };
