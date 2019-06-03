import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivRoute = ({
    component: Component,
    ...rest
}) => {
    const isAuth = sessionStorage.getItem('tkaccess')
    const isRefresh = sessionStorage.getItem('tkrefresh')
    //console.log(isAuth, 'is authhhhhhhh')
    return (
        <Route
            {...rest}
            render={props =>
                isAuth && isRefresh ? (
                    <Component {...props} {...rest} />
                ) : (
                        <Redirect
                            to={{ pathname: '/login', state: { from: props.location } }}
                        />
                    )
                }
        />
    );
}

export default PrivRoute;