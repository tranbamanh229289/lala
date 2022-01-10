import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {updateTodoAction, deleteTodoAction, indexTodosAction} from "../../redux/actions/todoListsAction";
import TextareaAutosize from "react-autosize-textarea";
import autoFocusEnd from "../../service/helpers/autoFocusEnd";

function Todo ({ itemTodoList, idProject }){
    const dispatch = useDispatch();
    const [isEditTodo, setIsEditTodo] = useState(false);
    const [editTodoDescription, setEditTodoDescription] = useState(itemTodoList.description);
    const [editTodoComplete, setEditTodoComplete] = useState(itemTodoList.complete);
    const updateTodo = ()=>{
        if(editTodoDescription) {
            dispatch(updateTodoAction(itemTodoList.id,{
                "description": editTodoDescription,
                "complete": editTodoComplete,
            }))
        }
        setIsEditTodo(false);
    }
    const updateTodoComplete = (e)=>{
        setIsEditTodo(false);
        setEditTodoComplete(e.target.checked);
        dispatch(updateTodoAction(itemTodoList.id,{
            "description": itemTodoList.description,
            "complete": e.target.checked,
        }))
        setIsEditTodo(false);
    }

    const destroyTodo = ()=>{
        dispatch(deleteTodoAction(itemTodoList.id));
        dispatch(indexTodosAction(idProject))
    }

    return (
        <div className="todo">
            <input className="form-check-input"  type="checkbox" checked={editTodoComplete}
            onChange={(e)=>updateTodoComplete(e) }/>
            {isEditTodo ?
                <div className="edit-todo">
                    <TextareaAutosize className="form-control" value={editTodoDescription} autoFocus
                                      onChange={(e)=>setEditTodoDescription(e.target.value)}
                                      onFocus={autoFocusEnd}/>
                    <div className="d-flex edit align-items-center">
                        <button className="btn btn-secondary save" onClick={updateTodo}><i className="far fa-save"></i>Lưu
                        </button>
                        <i className="fas fa-times" onClick={() => setIsEditTodo(false)}></i>
                    </div>
                </div> :
                <div className="d-flex justify-content-between">
                    {itemTodoList.description}
                    <div>
                        <i className="fas fa-edit" onClick={()=>setIsEditTodo(true)}></i>
                        <i className="far fa-trash-alt" onClick={destroyTodo}></i>
                    </div>
                </div>}
        </div>
    )
}
 export default Todo;
