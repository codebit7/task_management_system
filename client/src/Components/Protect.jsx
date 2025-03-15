import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { myContext } from './UserContext';

const Protect = ({ children}) => {
     const {isLogin} = useContext(myContext);
      return isLogin ? children : <Navigate to="/login" />;
}

export default Protect
