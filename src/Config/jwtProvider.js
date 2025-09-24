// const jwt = require ("jsonwebtoken")

// const SECRET_KEY="jgdsfkgfsblkj;krgkebgkbekbgkeknrnlkbklgkhdhtstjlhil"

// const generateToken = (userId) => {
//     const token = jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"})
//     return token;
// }

// const getUserIdFromToken=(token)=>{
//     const decodedToken = jwt.verify(token,SECRET_KEY)
//     return decodedToken.userId;
// }

// module.exports={generateToken,getUserIdFromToken}
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
