import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from './AuthContext';

const PrivateRoute = ({ Children }) => {
    const { loginState, setLoginState } = useContext(AuthContext)

    if (!loginState) {
        return (<Navigate to='/signin' />)
    }else{

        return Children
    }
}

export default PrivateRoute
