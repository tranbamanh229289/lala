import { TIME_DUE } from "../../redux/constant";

const updateColorTime = (current, end, setColorTime)=> {
    if (current > end) {
        setColorTime("btn-danger");
    } else {
        if(current.getTime()+TIME_DUE > end.getTime()){
            setColorTime("btn-warning");
        }
        else{setColorTime("btn-primary");}
    }
}
export default updateColorTime;
