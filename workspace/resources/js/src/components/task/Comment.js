import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCommentAction, updateCommentAction } from "../../redux/actions/commentsAction";
import TextareaAutosize from "react-autosize-textarea";
import FormOperation from "../project/FormOperation";
import autoFocusEnd from "../../service/helpers/autoFocusEnd";


function Comment({ comment, user, isMe, replyComment, time }) {
    const dispatch = useDispatch();
    const refDelComment = useRef();
    const [isDelComment, setIsDelComment] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);
    const [editComment, setEditComment] = useState(comment.content);

    useEffect(()=>{
        document.addEventListener("click", outSideDeleteComment, true);
        return ()=>{
            document.removeEventListener("click", outSideDeleteComment, true);
        }
    },[])
    const outSideDeleteComment = (e)=>{
        if(refDelComment.current && refDelComment.current.contains(e.target)){
            return;
        }
        setIsDelComment(false);
    }

    const exitDelCommentForm = ()=>{
        setIsDelComment(false);
    }

    const updateComment = ()=>{
        if(editComment){
            dispatch(updateCommentAction(comment.id, {
                'content': editComment,
            }));
        }
        setIsEditComment(false);
    }

    return (
        <div className="comment d-flex align-items-start">
            <div className="avatar">{user.user_abbre}</div>
            <div className="comment-main ">
                <div className="comment-header">{user.name}</div>
                {isEditComment ?
                    <div className="d-flex flex-column">
                        <TextareaAutosize className="form-control" value={editComment} autoFocus onFocus={autoFocusEnd}
                                          onChange={(e)=>setEditComment(e.target.value)}/>
                        <div className="d-flex align-items-center edit">
                            <button className="btn btn-secondary save" onClick={updateComment}>
                                <i className="far fa-save"></i>Lưu</button>
                            <i className="fas fa-times" onClick={()=> setIsEditComment(false)}></i>
                        </div>
                    </div>
                    : <div className="comment-content form-control" >{comment.content}</div>}
                <div className=" comment-footer d-flex">
                    {isMe && !isEditComment ? <div className="d-flex">
                            <p onClick={()=>setIsEditComment(true)}>Chỉnh sửa</p>
                            <p onClick={()=>setIsDelComment(true)}>Xóa</p>
                        { isDelComment &&
                        <FormOperation exitForm={exitDelCommentForm} refForm={refDelComment} action={deleteCommentAction}
                                       data={{
                                           title:"Xóa Comment?",
                                           submit:"Xóa",
                                           dataAction : comment.id,
                                           typeAction : "delete",
                                           className: "form-group delete-comment",
                                           typeSubmit: "btn btn-danger form-control",
                                           isInput: false,}}/>
                        } </div> : !isEditComment && <p onClick={()=>replyComment(user.name)}>Trả lời</p>}
                </div>
            </div>
        </div>
    )
}
export default Comment;
