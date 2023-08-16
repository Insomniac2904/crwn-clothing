import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangeObserver,
  // signOutUser,
} from "../utils/firebase/firebase.util";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
  };
  // signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangeObserver((user) => {
      if (user) {
        // if new user create document else if old the snapshot will check existance and return snapshot
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
