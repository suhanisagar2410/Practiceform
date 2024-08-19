import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    hobbies:{
        type:Array,
        required:true,
    },
    field:{
        type:String,
        required:true,
    },
    joining_date:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }

})
const Student =  mongoose.model("Student",userSchema)
export default Student