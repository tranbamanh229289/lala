import {NUMBER_DAY_DUE} from "../../redux/constant";

const updateColorTime = (current, end, setColorTime)=> {
    if (current > end) {
        setColorTime("btn-danger");
    } else {
        setColorTime("btn-primary")
    }
}
export default updateColorTime;
