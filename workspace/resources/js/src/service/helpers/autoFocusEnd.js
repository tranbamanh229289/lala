const autoFocusEnd = (e)=>{
    var val = e.target.value;
    e.target.value = '';
    e.target.value = val;
}
export default autoFocusEnd;
