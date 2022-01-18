import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from '../components/StateProvider/StateProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [{user}] = useStateValue();
    const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuthenticated"));
    const userEmail = isAuthenticated ? isAuthenticated.email : '';
    return(
    <Route {...rest} render={(props) => (
        isAuthenticated && userEmail == 'ivansifner96@gmail.com'
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
    )
    }

export default ProtectedRoute;