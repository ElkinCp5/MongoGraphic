import config from '../../config.fetch';
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZTBhZGMwZWFjNGM3ODIxOGNkMTc1NTciLCJuYW1lIjoiZWxraW4gcG9ydG9jYXJyZXIiLCJlbWFpbCI6ImRoYy1tdXNpY0BlbWFpbC5jb20iLCJyb2xlIjoiVVNFUl9TVEFOREFSIiwiYXZhdGFyIjoiaW1nL3VzZXIvZGVmYXVsdC5qcGciLCJpYXQiOjE1Nzc3NzM3OTcsImV4cCI6MTU3ODM3ODU5N30.vU3w8fnKbh2lpxGjEppiJwWSK4tCKznEn3mMFEn_eI0'

const { baseURL, headers } = config;
const uri = baseURL + 'auth/';
headers.authenticate = token;

const session = () =>{
    let data = null;
    fetch((uri+'account'), {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        'authenticate': token
    }
    }).then(res =>{

        console.log('session:=> ',res)
    }).catch(err =>{
        console.log('Error: ', err); 
    }) 
}

const signin = async(email, password) =>{
    const data = await fetch(
        uri + 'signin', 
        {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({email, password}), // data can be `string` or {object}!
            headers: headers
        }
    )
}

const signup = async(name, email, password) =>{

}

const signout = async() =>{
    
}

const update = async() =>{
    
}

const destroy = async() =>{
    
}

export default {
    session,
    signin,
    signup
}