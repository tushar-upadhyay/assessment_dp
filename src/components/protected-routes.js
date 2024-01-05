import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../App";

export const ProtectedRoutes = () => {

    useEffect(() => {
        console.log(user)
    }, [])
    const { user } = useContext(UserContext);


    return user ? <Outlet /> : <Navigate to={'/login'} />
}