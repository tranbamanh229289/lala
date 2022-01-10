import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitDetailTaskAction, updateDescriptionAction } from "../redux/actions/tasksAction";
import { storeCommentAction } from "../redux/actions/commentsAction";
import { storeTodoAction } from "../redux/actions/todoListsAction";
import { updateNameTaskAction, deleteTaskAction } from "../redux/actions/tasksAction";
import autoFocusEnd from "../service/helpers/autoFocusEnd";
import Time from "../components/task/Time";
import Comment from "../components/task/Comment";
import Todo from "../components/task/Todo";
import FormOperation from "../components/project/FormOperation";
import TextareaAutosize from "react-autosize-textarea";
import FormAutoComplete from "../components/project/FormAutoComplete";

function DetailTask(){
    const dispatch = useDispatch();
    const me = useSelector((state) => state.user.data);
    const initTask = useSelector((state)=>state.task.data)
    const [nameTask, setNameTask] = useState(initTask.name);
    const [description, setDescription] = useState(initTask.description);
    const [members, setMembers] = useState(initTask.users);
    const [commenting, setCommenting] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [newTodoComplete, setNewTodoComplete] = useState(false);
    const [isNewTodo, setIsNewTodo] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [isEditNameTask, setIsEditNameTask] = useState(false);
    const [isAddMember, setIsAddMember]= useState(false);
    const [isDeleteTask, setIsDeleteTask] = useState(false);
    const ratioComplete = 100 * initTask.todo_lists.filter(item=>item.complete==1).length/initTask.todo_lists.length;
    const refCommenting = useRef();
    const refMember = useRef();
    const refNameTask = useRef();
    const refDelTask = useRef();

    useEffect(()=>{
        document.addEventListener("click", outSideMember, true);
        document.addEventListener("click", outSideNameTask, true);
        document.addEventListener("click", outSideDelTask, true);
        return ()=>{
            document.removeEventListener("click", outSideMember, true);
            document.removeEventListener("click", outSideNameTask, true);
            document.removeEventListener("click", outSideDelTask, true);
        }
    },[])
    const outSideMember = (e)=>{
        if(refMember.current && refMember.current.contains(e.target)){
            return;
        }
        setIsAddMember(false);
    }
    const outSideNameTask = (e)=>{
        if(refNameTask.current && refNameTask.current.contains(e.target)){
            return;
        }
        setNameTask('');
        setIsEditNameTask(false);
    }
    const outSideDelTask = (e)=>{
        if(refDelTask.current && refDelTask.current.contains(e.target)){
            return;
        }
        setIsDeleteTask(false);
    }

    const getUserComment = (comment, users)=>{
        const idUser = comment.id_user;
        const user = users.find((user)=>user.id==idUser)
        return user;
    }

    const exitDetailTask = ()=>{
        dispatch(exitDetailTaskAction());
    }

    const exitDeleteTask = ()=>{
        setIsDeleteTask(false);
    }

    const storeComment = ()=>{
        if(commenting){
            dispatch(storeCommentAction({
                'id_user' : me.id,
                'id_task':initTask.id,
                'id_project':initTask.id_project,
                'content': commenting,
            }));
            setCommenting('');
        }
    }

    const exitAddMember = ()=>{
        setIsAddMember(false);
    }
    const replyComment = (name)=>{
        name="@"+name+" ";
        setCommenting(name);
        refCommenting.current.scrollIntoView();
        refCommenting.current.focus();
    }
    const updateDescription = ()=>{
        if(description){
            dispatch(updateDescriptionAction(initTask.id, {
                "description" : description,
            }));
        }
        setIsEditDescription(false);
    }
    const storeTodo = ()=>{
        if(newTodoDescription){
            dispatch(storeTodoAction({
                "description": newTodoDescription,
                "complete": newTodoComplete,
                "id_task": initTask.id,
            }))
        }
        setNewTodoDescription('');
        setIsNewTodo(false);
    }

    const updateNameTask = (e)=>{
        if(e.keyCode==13){
            if(nameTask){
                dispatch(updateNameTaskAction(initTask.id, {
                    "name":nameTask,
                }))
            }
            setIsEditNameTask(false);
        }
    }

    return (
        <div className="detail-task">
            <div className="detail-header">
                <div className="detail-title form-group" ref={refNameTask}>
                    <i className="fab fa-trello"></i>
                    {isEditNameTask ?
                        <input className="form-control" value={nameTask} autoFocus
                               style={{width: `${nameTask ? nameTask.length+5 : initTask.name.length +5}ch`}}
                               onFocus={autoFocusEnd}
                               onChange={(e)=>setNameTask(e.target.value)}
                               onKeyDown={updateNameTask}
                        />
                        :<label onClick={()=>setIsEditNameTask(true)}>{initTask.name}</label>}
                </div>
                <i className="fas fa-times" onClick={exitDetailTask}></i>
            </div>
            <hr/>
            <div className="detail-content">
                <div className="detail-main">
                    <div className="form-group">
                        <i className="far fa-clock"></i>
                        <label htmlFor="deadline">Thời gian</label>
                        <br/>
                        <Time start={initTask.start_time} end={initTask.end_time} idTask={initTask.id} />
                    </div>
                    <div className="form-group">
                        <i className="fas fa-users"></i>
                        <label htmlFor="member">Thành viên</label>
                        <div className="member">
                            {
                                members.map((item, index)=><div className="avatar" key={index}>{item.user_abbre}</div>)
                            }
                            <i className="fas fa-plus" onClick={()=>setIsAddMember(true)}></i>
                            {isAddMember &&
                            <FormAutoComplete refMember={refMember} exitForm={exitAddMember}/>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-pen"></i>
                        <label htmlFor="description" > Mô tả</label>
                        <button className="btn btn-light" style={{color:"#000000", border: 0}}
                                onClick={()=>setIsEditDescription(true)}>Chỉnh sửa</button>
                        {isEditDescription ?
                            <div className="d-flex flex-column">
                                <TextareaAutosize className="form-control" value={description} id="description"
                                                  onChange={(e)=>setDescription(e.target.value)}
                                                  onFocus={autoFocusEnd}
                                                  autoFocus
                                />
                                <div className="d-flex edit align-items-center">
                                    <button className="btn btn-secondary save" onClick={updateDescription}>
                                        <i className="far fa-save"></i>Lưu</button>
                                    <i className="fas fa-times" onClick={()=>setIsEditDescription(false)}></i>
                                </div>
                            </div>:
                            <div className="div-text">{initTask.description}</div>}
                    </div>
                    <div className="form-group">
                        <i className="fas fa-tasks"></i>
                        <label htmlFor="todo">Việc cần làm</label>
                        <div className="progress" style={{height:"10px"}}>
                            <div className={"progress-bar progress-bar-striped progress-bar-animated"
                            + (ratioComplete==100 ?" bg-success" : " bg-info") } role="progressbar"
                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${ratioComplete}%`}}>
                            </div>
                        </div>
                        <div className="form-check d-flex flex-column" >
                        {initTask.todo_lists.map((item, index)=>
                            <Todo itemTodoList={item} key={index} idProject={initTask.id_project}></Todo>)}

                            {isNewTodo ?
                                <div className="add-todo">
                                    <input className="form-check-input" type="checkbox" value={newTodoComplete}
                                           checked={newTodoComplete}
                                           onChange={()=>setNewTodoComplete(prev=>!prev)}/>
                                    <TextareaAutosize className="form-control" value={newTodoDescription} autoFocus
                                           onChange={(e) => setNewTodoDescription(e.target.value)}/>
                                    <div className="d-flex edit align-items-center">
                                        <button className="btn btn-secondary save"
                                        onClick={storeTodo}><i className="far fa-save"></i>Lưu
                                        </button>
                                        <i className="fas fa-times" onClick={() => {
                                            setIsNewTodo(false);
                                            setNewTodoDescription(' ');
                                            setNewTodoComplete(false);
                                        }}></i>
                                    </div>
                                </div> :
                                <button className="btn btn-secondary" onClick={()=> setIsNewTodo(true)} style={{width:"160px"}}>
                                    <i className="fas fa-plus"></i>Thêm một mục
                                </button>}
                        </div>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-comments"></i>
                        <label>Bình luận</label>
                        <br />
                        <div className="comments">
                            <div className="comment me">
                                <div className="comment-main d-flex align-items-center">
                                    <div className="avatar">{me.user_abbre}</div>
                                    <TextareaAutosize className="form-control" value={commenting}
                                                      onChange={(e)=> setCommenting(e.target.value)}
                                                      onFocus={autoFocusEnd}
                                                      ref={refCommenting}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={storeComment}>Comment</button>
                            </div>
                            {initTask.comments.map((comment, index)=>{
                                const user = getUserComment(comment, members);
                                if(user.id != me.id){
                                    return <Comment comment={comment} user={user} isMe={false}  key={index} replyComment={replyComment}/>
                                }else
                                    return <Comment comment={comment} user={user} isMe={true} key={index} replyComment={replyComment}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className="detail-sidebar">
                    <button className="btn btn-danger" onClick={()=>setIsDeleteTask(true)}>
                        <i className="fas fa-trash-alt"></i>Xóa Task
                    </button>
                    {isDeleteTask && <FormOperation exitForm={exitDeleteTask} refForm={refDelTask} action={deleteTaskAction}
                    data={{
                        title:"Task này sẽ bị xóa ?",
                        submit:"Xóa",
                        dataAction : initTask.id,
                        typeAction : "delete",
                        className: "form-group delete",
                        typeSubmit: "btn btn-danger form-control",
                        isInput: false,
                    }}/>}
                </div>
            </div>
        </div>
    )
}
export default DetailTask

