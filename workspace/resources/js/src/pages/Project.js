import React, {memo, useEffect, useState, useRef} from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { indexProjectsAction, storeProjectAction } from "../redux/actions/projectsAction";
import Header from "../components/project/Header";
import Sidebar from "../components/project/Sidebar";
import Main from "../components/project/Main";
import Home from "./Home";
import DetailTask from "./DetailTask";
import FormOperation from "../components/project/FormOperation";

function Project(){
    const dispatch = useDispatch();
    const task = useSelector((state)=> state.task.data);
    const projects = useSelector((state)=>state.projects.data);
    const [addProject, setAddProject] = useState(false);
    const refAddProject = useRef(null);
    useEffect(()=>{
        dispatch(indexProjectsAction());
        document.addEventListener('mousedown', outSideAddProject, true);
        return ()=>{
            document.removeEventListener('mousedown', outSideAddProject, true);
        }
    },[]);

    const outSideAddProject = (e)=>{
        if(refAddProject.current && refAddProject.current.contains(e.target)){
            return ;
        }
        setAddProject(false);
    }
    const showAddProject = ()=>{
        setAddProject(true);
    }
    const hideAddProject = ()=>{
        setAddProject(false);
    }
    return (
        <div className="wrapper">
            <Header/>
            <div className="content d-flex flex-grow-1">
                <Sidebar projects={ projects } handleAddProject={showAddProject}  />
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/:idProject/*' element={ <Main/> }/>
                </Routes>
            </div>
            {task && <DetailTask task = { task } />}
            {addProject &&
            <FormOperation exitForm={hideAddProject} refForm={refAddProject} action={storeProjectAction}
                           data={{
                               title: "Tạo bảng",
                               submit: "Tạo mới",
                               placeholder: "Tên project",
                               dataAction: "name",
                               typeAction: "store",
                               className:"form-group add-project",
                               typeSubmit:"btn form-control",
                               isInput: true,
                           }}/>}
        </div>
    )
}
export default memo(Project)

