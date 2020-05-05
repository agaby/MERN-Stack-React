import mongoose from 'mongoose';
const connection = {};

async function connectDb(){
    if(connection.isConnected){
        //use exisisting db connection 
        return;
    }
    //use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV,{
        //getting rid of warnigns
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connection.isConnected = db.connections[0].readyState;
}

export default connectDb;