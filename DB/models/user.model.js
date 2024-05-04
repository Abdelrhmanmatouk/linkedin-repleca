
import mongoose, { Schema } from 'mongoose';

// create user schema

const userschema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    recoveryEmail: {
      type: String,
    },
    DOB: {
      type: Date,
    },mobileNumber:{
        type: Number, require: true, unique: true
    },role:{
        type:String,
        enum:['user','Company_HR'],
        require:true
    },status:{
        type:String,
        default:'offline',
        enum:['online','offline']
    },userTechSkills:[String],
    userSoftSkills:[String],
    isConfirmed: {
      type: Boolean,
      default: false,
    },forgetCode:String
  },
  { timestamps: true }
);

// middleware in mongoose to create userName 

userschema.pre('save',function(next){
    this.userName=this.firstName+' '+this.lastName
    next()
})


// user model

export const User = mongoose.model('User',userschema)