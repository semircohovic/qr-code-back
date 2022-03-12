const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config");

// Replace this with your MONGOURI.
const MONGOURI = `mongodb://127.0.0.1:27017/backend-qr`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// const MONGOURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/backend-qr`;

// const InitiateMongoServer = () => {
//   mongoose
//     .connect(MONGOURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("succesfuly connected to DB"))
//     .catch((e) => {
//       console.log(e);
//       setTimeout(InitiateMongoServer, 5000);
//     });
// };

module.exports = InitiateMongoServer;
