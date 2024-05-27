import mongoose from 'mongoose'
const todoschema =new mongoose.Schema({
  title:{
    type:String,
    required:true
  }
},{timestamps:true}
)
export const todo =mongoose.model('Todo',todoschema)

