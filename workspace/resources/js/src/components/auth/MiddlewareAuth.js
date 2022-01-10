import {Navigate, Outlet} from "react-router-dom";

function MiddlewareAuth({auth}){
    if (auth){
        return <Outlet/>
    }
    else return <Navigate to="/login" />
}
export default MiddlewareAuth;
