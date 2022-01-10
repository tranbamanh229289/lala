import React, { useState } from 'react';
import { login } from "../../service/api/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { showToastSuccess, showToastError } from "../../service/showToast/showToast";

function LoginForm () {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        'email' : '',
        'password' : '',
    })
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setInput = (event)=>{
        setUser((prev)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const loginHandle = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        try{
            const res = await login(user);
            showToastSuccess('Login Success !');
            setError(null);
            navigate('/workspace');
            window.location.reload()
        } catch (e){
           setError(e.response.data.error);
           showToastError('Login fail !');
        }
        setIsLoading(false);
    }
    return (
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <form className="col-4 border p-3" onSubmit={loginHandle}>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column col-3">
                        <img src="/image/logo/logo-app.png" alt=""/>
                        <h1 className="text-center text-primary">LALA</h1>
                    </div>
                </div>
                {error && <div className="text-danger text-center" role="alert">
                    {error}
                </div>}
                <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                    <input type="email" name="email" value={user.email} onChange={setInput}
                           placeholder="Enter email " className="form-control"/>
                </div>
                <br/>
                <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <input type="password" name="password" value={user.password} onChange={setInput}
                           placeholder="Enter password " className="form-control"/>
                </div>
                <br/>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary d-flex align-items-center col-4  justify-content-around">
                        {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>}
                         Login
                    </button>
                </div>
                <ToastContainer/>
            </form>
        </div>
    )
}
export default LoginForm;
