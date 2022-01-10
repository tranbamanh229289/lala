const formatDatetime = (time, type)=>{
    time = new Date(time);
    const day = time.getDate();
    const month = time.getMonth()+1;
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    switch(type){
        case "yyyy-mm-dd HH:MM:SS":
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        case"dd-mm-yyyy HH:MM:SS":
            return day+"-"+month+"-"+year+" "+hours+":"+minutes+":"+seconds;
        case "dd-mm-yyyy":
            return day+"-"+month+"-"+year;
    }
}
export default formatDatetime;

