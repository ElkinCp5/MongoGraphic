module.exports = (Connection) =>{
    // CONNECTION EVENTS
    // When successfully connected
    if(Connection != undefined || Connection != 'undefined'){
        Connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbURI);
        });
        
        // If the connection throws an error
        Connection.on('error',function (err) {
            console.log('Mongoose default connection error: ' + err);
        });
        
        // When the connection is disconnected
        Connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });
      
        // When the connection is open
        Connection.on('open', function () {
            console.log('Mongoose default connection is open');
        });
      
        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
            });
        });
    }
}