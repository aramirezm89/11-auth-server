const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CONNECTIONSTRING);
    console.log("BD online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la BD");
  }
};

module.exports = {
  dbConnection,
};
