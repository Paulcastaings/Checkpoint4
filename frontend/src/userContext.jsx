/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const { Provider } = userContext;

  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  useEffect(() => {
    const localStor = JSON.parse(window.localStorage.getItem("userData"));
    if (localStor) {
      setUserInfo(localStor);
    }
  }, []);

  return (
    <Provider
      value={{
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        currentEmail,
        setCurrentEmail,
        showAccount,
        setShowAccount,
      }}
    >
      {children}
    </Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useUser = () => useContext(userContext);
