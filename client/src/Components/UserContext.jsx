import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export const myContext = createContext();

const ContextProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      user: { name: "", email: "", _id: "" },
      token: null,
    };
  
    const storedLoginStatus = JSON.parse(localStorage.getItem("isLogin")) || false;
  
    const [currentUser, setCurrentUser] = useState(storedUser);
    const [isLogin, setIsLogin] = useState(storedLoginStatus);
    const [profileOpen, setProfileOpen] = useState();
    const [toast, setToast] = useState(null);
  
   
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("isLogin", JSON.stringify(isLogin));

    }, [currentUser, isLogin]);


  return (
    <myContext.Provider 
    value={
      {currentUser,
      setCurrentUser,
      isLogin,
      setIsLogin,
      setToast,
      toast,
      profileOpen,
      setProfileOpen}
      }>

      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
