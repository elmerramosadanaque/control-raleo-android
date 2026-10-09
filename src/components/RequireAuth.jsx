import { useLocation, Navigate, Outlet } from "react-router";
import {useAuthStore} from "../hooks"

export const RequireAuth  = ()=>{
    const { user } = useAuthStore();
    const location = useLocation();

    return (
        user ? <Outlet />
             : <Navigate  to = "/login" state ={{from: location}} replace></Navigate>
    )
}