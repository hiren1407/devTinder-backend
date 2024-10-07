const mongoose = require("mongoose");
const validator=require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase:true,
    required: true,
    undefined: true,
    trim:true,
    validate(value){
        if(!validator.isEmail(value))
            throw new Error("Email is not valid")
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong password: "+value)
        }
    }
  },
  age: {
    type: Number,
    min:18,

  },
  gender: {
    type: String,
    enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    // validate(value){
    //     if(!["male","female","other"].includes(value)){
    //         throw new Error("Gender data is not valid")
    //     }
    // }
  },
  photoUrl:{
    type: String,
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("PhotoURL is not valid")
        }
    }

  },
  about:{
    type: String,
    default:"This is a default about of the user."
  },
  skills:{
    type:[String]
  }
  
},
{
    timestamps:true
});

userSchema.methods.getJWT = async function () {
    const user = this;
  
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
  
    return token;
  };
  
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
  
    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
  
    return isPasswordValid;
  };

module.exports = mongoose.model("User", userSchema);