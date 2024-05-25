const mongoose = require("mongoose")

const connectDB = mongoose.connect(process.env.MONGODB_URL);

connectDB
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: Number,
      
       
    },
    password: {
        type: String,
       
    },
    isAdmin: {
        type: String,
        default: "0",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isGoogle:{
      type:Boolean,
      default: false
    },
    googleId:{
        type: String
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
