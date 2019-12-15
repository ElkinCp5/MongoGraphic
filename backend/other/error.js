module.exports = (name, request, action, area, message, error )=>{
    console.log(`${action}: ${name} // ${area}`);
    return {
        data:    request,
        action:     `${action}: ${name}`, 
        area:       area,
        message:    message,
        error:      error
    };
}