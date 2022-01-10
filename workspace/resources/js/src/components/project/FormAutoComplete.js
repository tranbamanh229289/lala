import {useState} from "react";

function FormAutoComplete({ refMember ,exitForm }){
    const [users, setUsers] = useState(["AC", "BC", "DC", "AC"]);
    const [user, setUser] = useState();
    const [isShowSelect, setIsShowSelect] = useState(true);
    const changeInputSearch = (e)=>{
        setUser(()=>e.target.value);
        setUsers((prev)=>{
            return prev.filter(item=>item.includes(user))
        })
    }
    return (
        <div className="invite-form form-group" ref={refMember}>
            <div className="header-invite d-flex text-center">
                Thêm thành viên
                <i className="fas fa-times" onClick={exitForm}></i>
            </div>
            <hr/>
            <div className="content-invite">
                <input className="form-control" placeholder="tìm kiếm" value={user} autoFocus
                       onClick={()=>setIsShowSelect(prev=>!prev)}
                       onChange={changeInputSearch}/>

                {isShowSelect ? <div className="select-user">
                    {users.map((item)=>
                        <div className="option-user" onClick={()=>{
                            setUser(item)
                            setIsShowSelect(false);
                        }}>{item}</div>)}</div> : <button className="btn btn-primary form-control">Thêm</button>
                }

            </div>
        </div>
    )
}
export default FormAutoComplete
