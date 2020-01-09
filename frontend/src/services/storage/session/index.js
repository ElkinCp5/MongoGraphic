
const setToken =(storage)=>{
    sessionStorage.setItem('token', storage);
}
const setVerify =(storage)=>{
    sessionStorage.setItem('verify', storage);
}
const setAccount =(storage)=>{
    sessionStorage.setItem('account', storage);
}

const getToken =()=>{
    return sessionStorage.getItem('token');
}
const getVerify =()=>{
    return sessionStorage.getItem('verify');
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
    
    setVerify,
    getVerify,
    out
}