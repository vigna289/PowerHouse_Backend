// const mongoose = require("mongoose")

// const mongodbUrl="mongodb+srv://vigna298_db_user:Uk658JhexxSG6m4B@cluster0.hf9mqu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// const connectDb=()=>{
//     return mongoose.connect(mongodbUrl);
// }

// module.exports={connectDb}
const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGO_URI;

const connectDb = () => {
  return mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDb };
