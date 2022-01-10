import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import ReactDOM from "react-dom";
import Login from './pages/Login';
import Project from "./pages/Project";
import MiddlewareAuth from "./components/auth/MiddlewareAuth";
import {Provider} from "react-redux";
import store from "./redux/store";
import tokenStorage from "./service/storage/tokenStorage";

function App(){
    let auth = !! tokenStorage.getAccessToken();
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/login" element={auth ?<Navigate to="/workspace"/> : <Login/> } />
                    <Route element={ <MiddlewareAuth auth={auth}/> }>
                        <Route path="/workspace/*" element={ <Project/> } />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App
if (document.getElementById('app')) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
}
