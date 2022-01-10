import React, { useState } from "react";
import { useDispatch } from "react-redux";

function FormOperation ({ exitForm, refForm, data ,action }){
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const submitForm = (e)=>{
        e.preventDefault();
            switch(data.typeAction){
                case "delete" :
                {
                    dispatch(action(data.dataAction));
                    break;
                }
                case "store" :
                {
                    dispatch(action({[data.dataAction]: input}));
                    break;
                }
                default: return;

        }
        exitForm();
    }
    return (
        <form onSubmit={submitForm}>
            <div className={data.className} ref={refForm}>
                <div className="header-form-operation text-center ">
                    {data.title}
                    <i className="fas fa-times float-end " onClick={exitForm}></i>
                </div>
                <hr/>
                <div className="content-form-operation">
                    {data.isInput && <input className="form-control" value={input} placeholder={data.placeholder}
                           onChange={(e)=>setInput(e.target.value)} autoForcus/>}
                    <button type="submit" className={data.typeSubmit}>
                        {data.submit}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default FormOperation;
