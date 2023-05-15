import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(
  `mongodb+srv://lena:${encodeURIComponent(process.env.MONGO_CLUSTER_PWD)}@cluster0.hpum9pm.mongodb.net/alura-biblioteca`
);

let db = mongoose.connection;

export default db;
