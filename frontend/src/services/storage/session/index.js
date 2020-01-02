
const set =(token)=>{
    sessionStorage.setItem('token', token);
}

const get =()=>{
    return sessionStorage.getItem('token');
}

const out =()=>{
    sessionStorage.clear();
}

export default {
    set,
    get,
    out
}