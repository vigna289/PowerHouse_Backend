const app = require(".");
const { connectDb } = require("./Config/db");

const PORT=5454;

app.listen(PORT,async()=>{
    await connectDb();
    console.log("ecommerce api listening on PORT : ",PORT);
})