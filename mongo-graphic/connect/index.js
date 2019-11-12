module.exports = (Connection, dbUrl) =>{
    // CONNECTION EVENTS
    // When successfully connected
    if(Connection != undefined || Connection != 'undefined'){
        Connection.on('connected', () => {
            console.info('Mongoose default connection open to ' + dbUrl);
        });
        
        // If the connection throws an error
        Connection.on('error', (err) => {
            console.error('Mongoose default connection error: ' + err);
        });
        
        // When the connection is disconnected
        Connection.on('disconnected', () =>{
            console.info('Mongoose default connection disconnected');
        });
      
        // When the connection is open
        Connection.on('open', () =>{
            console.log('Mongoose default connection is open');
        });
      
        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
            });
        });
    }
}