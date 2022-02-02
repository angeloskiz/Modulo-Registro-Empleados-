import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOURI || 'localhost:8085');

const connection= mongoose.connection;
connection.once('open',()=>{
    console.log('Mongodb Conexion Establecida');
});

connection.on('error', err =>{
    console.log(err);
    process.exit(0);
});