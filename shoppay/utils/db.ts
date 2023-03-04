import mongoose from 'mongoose';

interface Connection {
  isConnected?: mongoose.ConnectionStates | boolean;
}

const connection: Connection = {
  isConnected: false
};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Already connected to the database')
    return
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection to the database')
    }
    await mongoose.disconnect()
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
  const db = await mongoose.connect(mongoUri)
  console.log("New connection to the database")
  connection.isConnected = db.connections[0].readyState
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log("not disconnecting from the database.")
    }
  }
}

const db = { connectDb, disconnectDb }
export default db;
