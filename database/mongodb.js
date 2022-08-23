const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(connection => {
        global.__db__ = connection;
        console.log(`mongodb url: mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`.bgGreen);
    })
    .catch(error => console.log('can not connect to mongodb: '.bgRed));

mongoose.connection.on('connected', () => {
    console.log('mongoose connected'.bgGreen);
});

mongoose.connection.on('error', error => {
    console.log('mongoose connection failed : '.bgRed, error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected'.bgYellow);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});