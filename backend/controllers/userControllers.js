const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password, pic} = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if(userExists){
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name, email, password, pic,
  });
  if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
    });
  }
  else{
    res.status(400);
    throw new Error("Failed to Create the user");
  }
});

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// for id we write req.params
// /api/user?search=piyush
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
      {name: {$regex: req.query.search, $options: "i"}},
      {email: {$regex: req.query.search, $options: "i"}}
    ]
  } : {};

  const users = await User.find(keyword).find({_id: {$ne: req.user._id}}); // ne is not equal to except for the user which is logged in
  res.send(users);
});

module.exports = {registerUser, authUser, allUsers}