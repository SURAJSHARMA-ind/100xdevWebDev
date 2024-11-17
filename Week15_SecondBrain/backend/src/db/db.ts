import mongoose from 'mongoose'
const {Schema}  = mongoose

const userSchema = new Schema ({
    username:{type:String , unique : true},
    password : {type : String, minlength:8 , maxlenth:30}
})


export userSchema   