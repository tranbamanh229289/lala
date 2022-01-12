import "react-datepicker/dist/react-datepicker.css"
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import formatDatetime from "../../service/helpers/formatDatetime";
import { updateTimeAction } from "../../redux/actions/tasksAction";
import {NUMBER_DAY_DUE, TIME_DUE} from "../../redux/constant";
import updateColorTime from "../../service/helpers/setColorTime";

function Time({ start, end, idTask }){
    const dispatch = useDispatch()
    const startTime = new Date(start);
    const endTime = new Date(end) ;
    const [colorTime, setColorTime]= useState("btn-primary");

    useEffect(()=>{
        updateColorTime(new Date(), endTime, setColorTime);
    },[])

    const changeTime = (start, end, type="yyyy-mm-dd HH:MM:SS")=> {
        if(start>end){
            end.setTime(start.getTime()+TIME_DUE);
        }
        updateColorTime(new Date(), end, setColorTime);
        start = formatDatetime(start, type);
        end= formatDatetime(end, type);

        dispatch(updateTimeAction(idTask, {
            start_time: start,
            end_time: end,
        }))
    }

    return (
        <div className="time">
            <label className="start-time d-flex"><p>Ngày bắt đầu</p>
            <DatePicker
                className="btn btn-primary time"
                selected={startTime}
                onChange={(date) => changeTime(date, endTime)}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput/></label>
            <label className="end-time d-flex"><p>Ngày kết thúc</p>
            <DatePicker
                className={"btn time "+ colorTime}
                selected={endTime}
                onChange={(date) => changeTime(startTime, date)}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput/>
            </label>
        </div>
    )
}
export default Time;
