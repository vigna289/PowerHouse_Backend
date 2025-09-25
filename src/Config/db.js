// const mongoose = require("mongoose")

// const mongodbUrl="mongodb+srv://vigna298_db_user:Uk658JhexxSG6m4B@cluster0.hf9mqu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// const connectDb=()=>{
//     return mongoose.connect(mongodbUrl);
// }

// module.exports={connectDb}
const mongoose = require("mongoose");

// Get MongoDB URL from environment variable
const mongodbUrl = process.env.MONGODB_URL;

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
