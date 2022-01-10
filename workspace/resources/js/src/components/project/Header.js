import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { logout } from "../../service/api/auth";
import { getMeAction } from "../../redux/actions/userAction";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        logout();
        navigate('/login');
        window.location.reload();
    }
    useEffect(()=>{
        dispatch(getMeAction());
    },[])
    const me = useSelector((state)=>state.user.data);
    return (
        <div className="header ">
            <div className="logo">
                <img src="/image/logo/logo-app.png" alt=""/>
                <p className="text-light" onClick={()=>navigate('/workspace')}>LALA</p>
            </div>
            <div className="search">
                <input type="text" className="form-control" placeholder="Search"/>
            </div>
            <div className="account">
                <div className="avatar">{me.user_abbre}</div>
                <p className="text-light logout" onClick={handleLogout}>Logout</p>
            </div>
        </div>
    )
}
export default Header
