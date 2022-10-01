import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { readUsers, db } from "../funciones/firebase";
export const UsersContext = createContext();

function UsersContextProvider({ children }) {
  const [usersData, setUsersData] = useState({});
  const [loginState, setLoginState] = useState({});
  useEffect(() => {
    readUsers().then((res) => {
      const usersArray = [];
      res.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setUsersData(usersArray);
    });
  }, []);
  return (
    <UsersContext.Provider
      value={[usersData, setUsersData, loginState, setLoginState]}
    >
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
