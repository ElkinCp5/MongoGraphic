
const setToken =(storage)=>{
    sessionStorage.setItem('token', storage);
}
const setAccount =(storage)=>{
    sessionStorage.setItem('account', storage);
}

const getToken =()=>{
    return sessionStorage.getItem('token');
}
const getAccount =()=>{
    return sessionStorage.getItem('account');
}

const out =()=>{
    sessionStorage.clear();
}

export default {
    setToken,
    getToken,
    setAccount,
    getAccount,
    out
}