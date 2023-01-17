import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const PrivateRoute = (props: any) => {

    const [auth, setAuth] = useState<string|null>(localStorage.getItem('token'))

    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute