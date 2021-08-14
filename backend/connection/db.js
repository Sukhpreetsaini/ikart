import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connect(process.env.MDB_Connect, (err) => {
        if (err) return console.error(err);
        console.log("Connected to MongoDB");
      });
    }

export default connectDB