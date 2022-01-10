import React, { useState, useRef, useEffect, memo }from 'react';
import { useDispatch } from "react-redux";
import {showTasksAction, storeTaskAction} from "../../redux/actions/tasksAction";
import { updateNameCategoryAction, deleteCategoryAction } from "../../redux/actions/categoriesAction";
import FormOperation from "./FormOperation";
import Task from "./Task";

function Category({ category, relativeCss, isInviteUser, todos }){
    const dispatch = useDispatch();
    const tasks = category.tasks;
    const [isChangeNameCate, setIsChangeNameCate] = useState(false);
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    const [isCreateTask, setIsCreateTask] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [nameCategory, setNameCategory] = useState(category.name);
    const refNameCategory = useRef(null)
    const refDeleteCategory = useRef(null);
    const refCategory = useRef(null);
    useEffect(()=>{
        document.addEventListener("click", outSideNameCategory, true);
        document.addEventListener("click", outSideDeleteCategory, true);
        document.addEventListener("click", outSideCategory, true);
        return () => {
            document.removeEventListener("click", outSideNameCategory, true);
            document.removeEventListener("click", outSideCategory, true);
        }
    }, [])
    const outSideNameCategory = (e) => {
        if(refNameCategory.current && refNameCategory.current.contains(e.target)){
            return;
        }
        setIsChangeNameCate(false);
    }

    const outSideDeleteCategory = (e) => {
        if(refDeleteCategory.current && refDeleteCategory.current.contains(e.target)){
            return;
        }
        setIsDeleteCategory(false);
    }
    const outSideCategory = (e)=> {
        if(refCategory.current && refCategory.current.contains(e.target)){
            return;
        }
        exitCreateTask();
    }

    const showDetailTask = (idTask) => {
        dispatch(showTasksAction(idTask));
    };
    const updateNameCategory = (e) => {
        if(e.keyCode == 13){
            setIsChangeNameCate(false);
            dispatch( updateNameCategoryAction({name: nameCategory}, category.id) );
        }
    }
    const storeTask = ()=>{
        dispatch(storeTaskAction({
            name: newTask,
            id_category: category.id,
            id_project: category.id_project,
        }));
        setNewTask('');
        setIsCreateTask(false);
    }

    const exitDeleteCategory = ()=>{
        setIsDeleteCategory(false);
    }

    const exitCreateTask = ()=>{
        setIsCreateTask(false);
        setNewTask('');
    }

    return (
        <div className="category" style={isInviteUser ?{}:relativeCss} ref={refCategory}>
            <div className="header-category d-flex justify-content-between" >
                {isChangeNameCate ?
                    <input className="form-control" value={nameCategory} autoFocus
                           onChange={(e)=>setNameCategory(e.target.value)}
                           onKeyDown={updateNameCategory}
                           ref={refNameCategory}
                    /> :
                    <p onClick={()=>{
                        setIsChangeNameCate(true);
                        setNameCategory(category.name);}}>{category.name}
                    </p>}
                <i className="fas fa-caret-down" onClick={()=>setIsDeleteCategory(true)}></i>
            </div>
            {isDeleteCategory &&
            <FormOperation exitForm={ exitDeleteCategory } refForm={refDeleteCategory} action={ deleteCategoryAction }
                           data={{
                               title:"Xóa Category",
                               submit:"Xóa",
                               dataAction : category.id,
                               typeAction : "delete",
                               className: "form-group delete",
                               typeSubmit: "btn btn-danger form-control",
                               isInput: false,
                           }} />}
            <div className="content-category">
                <div className="tasks form-group">
                    {
                        tasks.map((item, index)=>
                            <Task item={item} key={index} showDetailTask={showDetailTask}
                            todos = {todos ? todos.find(task=>task.id==item.id) :[]}/>)
                    }
                    {isCreateTask &&
                    <div className="task" >
                        <div className="title-task">
                            <input className="form-control" value={newTask} placeholder="Nhập tiêu đề cho Task" autoFocus
                                   onChange={(e)=>{setNewTask(e.target.value)}} />
                        </div>
                    </div>}
                </div>
                {isCreateTask ?
                    <div className="form-group d-flex">
                        <button className="btn btn-info form-control add-task"  onClick={storeTask}>
                            <i className="far fa-save"></i>Save
                        </button>
                        <button className="btn btn-danger form-control"
                                onClick={exitCreateTask}>
                            <i className="fas fa-times"></i> Xóa
                        </button>
                    </div>:
                    <div className="form-group">
                        <button className="btn btn-info form-control add-task"
                                onClick={()=>setIsCreateTask(true)}>
                            <i className="fas fa-plus"></i>
                            Thêm thẻ
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
export default memo(Category);
