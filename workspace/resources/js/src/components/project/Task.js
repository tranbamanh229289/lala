import React, {useEffect, useState} from "react";
import formatDatetime from "../../service/helpers/formatDatetime";
import updateColorTime from "../../service/helpers/setColorTime";
import { useSelector } from "react-redux";

function Task ({ item, showDetailTask, todos }){
    const [colorTime, setColorTime ]= useState("btn-primary");
    useEffect(()=>{
        updateColorTime(new Date(), new Date(item.end_time), setColorTime);
    },[item.end_time])

    const numberTodoCompleted = todos ? todos.todo_lists.filter(item=>item.complete==1).length :0;
    const numberTodo = todos ? todos.todo_lists.length :0;
    return (
        <div className="task d-flex flex-column" onClick={()=>showDetailTask(item.id)} >
            <div className="title-task">{item.name}</div>
            <div className="time-complete d-flex align-items-center">
                {item.end_time && <button className={"btn "+ colorTime}>{formatDatetime(item.end_time, "dd-mm-yyyy")}</button>}
                <div className="todo d-flex align-items-center">
                    <i className="far fa-check-square"></i>{numberTodoCompleted +"/"+ numberTodo}
                </div>
            </div>
        </div>
    )
}
export default Task;
