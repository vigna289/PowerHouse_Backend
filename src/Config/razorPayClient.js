// const Razorpay = require("razorpay");
// apiKey= "rzp_test_RLPgLxrvh3CrS6"
// apiSecret="K0bYLyFLAgJZlCqwttMqi7xy"
// const razorpay = new Razorpay({
//   key_id:apiKey,
//   key_secret: apiSecret,
// });

// module.exports=razorpay;
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
