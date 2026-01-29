import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
//console.log(MONGODB_URI)

// declare global {
//   var mongoose: {
//     conn: Connection | null;
//     promise: Promise<Connection> | null;
//   };
// }

type ConnectionObject = {
  isConnected?: Number
}

const connection: ConnectionObject = {};

async function connectDB() {
  if (connection.isConnected) {
   // console.log("DB already connected")
    return;
  }
   
  try {

    const opts = {
      bufferCommands: false
    }

    const db: any = await mongoose.connect(`${MONGODB_URI}/startup`, opts)

    connection.isConnected = db.connection.readyState
   // console.log("DB connected")

  } catch (error) {
    console.log('DB connection error',error)
    process.exit(1)
  }
}

export default connectDB;
