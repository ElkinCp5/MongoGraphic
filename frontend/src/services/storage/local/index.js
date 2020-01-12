
const set =(key = undefined, value = undefined)=>{
    if(key && value){ localStorage.setItem(key, JSON.stringify(value));
    }else{ console.error('error local storage set: key or value undefined')}
}

const get =(key = undefined)=>{
    if(key){ return JSON.parse(localStorage.getItem(key));
    }else{ console.error('error local storage get: key  undefined')}
}

const remove =(key = undefined)=>{
    if(key){ localStorage.removeItem(key);
    }else{ console.error('error local storage remove: key  undefined')}
}

const empty =()=>{
    localStorage.clear();
}

export default {
    set,
    get,
    remove,
    empty
}