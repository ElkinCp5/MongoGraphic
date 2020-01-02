
const set =(token)=>{
    localStorage.setItem('token', token);
}

const get =()=>{
    return localStorage.getItem('token');
}

const out =()=>{
    localStorage.clear();
}

export default {
    set,
    get,
    out
}