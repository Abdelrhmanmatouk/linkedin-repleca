
import mongoose, { Schema } from "mongoose";

// company schema
const companySchema = new Schema({
    companyName:{
        type:String,
        unique:true,
        require:true
    },
    description:{
        type:String,
        require:true
    },industry:{
        type:String,
        require:true
    },address:{
        type:String,
        require:true
    },numberOfEmployees:{
        type:String,
        enum:['1-100','100-500','500-1000']
    },companyEmail:{
        type:String,
        require:true,
        unique:true
    },companyHR:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },companyowner:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},{timestamps:true})

// company model

export const Company = mongoose.model('Company',companySchema)