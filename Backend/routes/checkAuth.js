const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const secret = "secretkey"; // Use environment variable

const checkAuth =asyncHandler(async (req, res, next) => {
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
  try{
    token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,secret);
    req.user=await User.findById(decoded.id).select("-password");
    next();
  }catch(error){
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
}
if(!token){
  res.status(401);
  throw new Error("Not authorized, no token");
}

});

module.exports = checkAuth; // Correct CommonJS export
