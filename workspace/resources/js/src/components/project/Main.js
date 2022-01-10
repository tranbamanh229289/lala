import React, { useState, useEffect, memo, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { indexCategoriesAction, storeCategoryAction } from "../../redux/actions/categoriesAction";
import { updateNameProjectAction } from "../../redux/actions/projectsAction";
import Category from "./Category";
import FormOperation from "./FormOperation";
import {indexTodosAction} from "../../redux/actions/todoListsAction";

function Main(){
    const dispatch = useDispatch();
    const { idProject }= useParams();
    const project = useSelector((state)=>state.categories.data);
    const todos = useSelector(state=>state.todo.data.todos);
    const categories = project.categories
    const members = project.users ? project.users.map(item=> item.user_abbre): null;
    const [nameProject, setNameProject] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [isChangeNameProject, setIsChangeNameProject] = useState(false);
    const [isCreateCategory,setIsCreateCategory] = useState(false);
    const [isInviteUser, setIsInviteUser] = useState(false);
    const refCategory = useRef(null);
    const refProject = useRef(null);
    const refInvite = useRef(null);
    useEffect(()=>{
        dispatch(indexCategoriesAction( idProject ));
        dispatch(indexTodosAction( idProject ));
    }, [idProject])

    useEffect(()=>{
        document.addEventListener("click", outSideCategory, true);
        document.addEventListener("click", outSideProject, true);
        document.addEventListener("click", outSideInviteUser, true);
        return () => {
            document.removeEventListener("click", outSideCategory, true);
            document.removeEventListener("click", outSideProject, true);
            document.removeEventListener("click", outSideInviteUser, true);
        }
    },[]);

    const outSideCategory= (e)=>{
        if(refCategory.current && refCategory.current.contains(e.target)){
            return;
        }
        setIsCreateCategory(false);
    }
    const outSideProject= (e)=>{
        if(refProject.current && refProject.current.contains(e.target)){
            return;
        }
        setNameProject(project.name);
        setIsChangeNameProject(false);
    }
    const outSideInviteUser = (e)=>{
        if(refInvite.current && refInvite.current.contains(e.target)){
            return;
        }
        setIsInviteUser(false);
    }

    const storeCategory = () =>{
        if(newCategory){
            dispatch(storeCategoryAction({
                'name': newCategory,
                'id_project': idProject,
            }));
        }
        setIsCreateCategory(false);
        setNewCategory('');
    }

    const updateNameProject = (e)=>{
        if(e.keyCode==13){
            if(nameProject){
            dispatch(updateNameProjectAction({name: nameProject}, idProject));
            }
            setIsChangeNameProject(false);
        }
    }

    const exitFormInvite = ()=>{
        setIsInviteUser(false);
    }

    const relative = {
        position: "relative",
    }

    return (
        <div className="main">
            <div className="header-main d-flex flex align-items-center">
                <div className="name-project" ref={refProject}>
                {isChangeNameProject ?
                    <input value={nameProject || nameProject ==''? nameProject :project.name} className="form-control"
                           style={{width:`${nameProject ? nameProject.length +5:project.name.length +5}ch`}} autoFocus
                           onKeyDown={updateNameProject}
                           onChange={(e)=>setNameProject(e.target.value)}/> :
                    <button className="btn name-project d-flex align-items-center"
                            onClick={()=>setIsChangeNameProject(true)}>{project.name}
                    </button>}
                </div>
                {members && members.map((item,index)=><div className="avatar" key={index}>{item}</div>)}
                <button className="btn invite" onClick={()=>setIsInviteUser(true)}><i className="fas fa-user-plus"></i>Mời</button>
                {isInviteUser && <FormOperation exitForm= {exitFormInvite} refForm={refInvite}
                data={{
                    title :"Mời vào Project",
                    placeholder:"Địa chỉ Email",
                    submit : "Gửi lời mời",
                    className:"form-group invite-users",
                    typeSubmit:"btn form-control",
                    isInput:true,
                }} action={{}}/>}
            </div>
            <div className="categories d-flex align-items-start">
                {categories && categories.map((item, index)=>
                    <Category key={index} category={ item } relativeCss={relative} isInviteUser={isInviteUser}
                              todos={todos ? todos.filter(task=>task.id_category==item.id):[]}/>)}

                <div className="category d-flex align-items-center " ref= {refCategory}>
                    {isCreateCategory?
                        <div className="form-group">
                            <input className="form-control" placeholder="Nhập tiêu đề cho category" value={newCategory} autoFocus
                            onChange={(e)=>setNewCategory(e.target.value)}/>
                        </div> :
                        <div className="form-group d-flex align-items-center justify-content-between"
                             onClick={()=>setIsCreateCategory(true)}>
                            <div className="div ">
                                <i className="fas fa-plus-circle"></i>
                                Thêm danh sách khác
                            </div>
                        </div>}
                    {isCreateCategory &&
                        <div className="form-group">
                            <button className="btn btn-info form-control add-task" onClick={ storeCategory }>
                                <i className="far fa-save"></i>Save
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default memo(Main);
