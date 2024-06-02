import mongoose from "mongoose";

export default async function connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao banco de dados");
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados", err);
    throw new Error(err);
  }
}
