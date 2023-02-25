import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://lena:${process.env.MONGO_CLUSTER_PWD}@cluster0.hpum9pm.mongodb.net/alura-biblioteca`
);

let db = mongoose.connection;

export default db;
