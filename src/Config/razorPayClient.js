const Razorpay = require("razorpay");
apiKey= "rzp_test_RLPgLxrvh3CrS6"
apiSecret="K0bYLyFLAgJZlCqwttMqi7xy"
const razorpay = new Razorpay({
  key_id:apiKey,
  key_secret: apiSecret,
});

module.exports=razorpay;