import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {todo} from '../backend/models/todoModel.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO).then(()=>{
  console.log('database is connected')
  app.listen(3000,()=>{
    console.log('server is running succesfully')
  })
})
.catch((error)=>{
  console.log('connection error',error)
})
app.get('/todo',async (req,res)=>{
try{
const todos =await todo.find()
res.json({todos})
}
catch(err){
  res.status(401).json({message:'failed to fetch todos',error:err.message})
}
})
app.post('/todo',async (req,res)=>{
try{
  const Todo = new todo({title:req.body.title})
  const savedTodo =await Todo.save()
res.status(201).json({savedTodo})
}
catch(error){
  res.status(401).json({})

}
})
app.delete('todo/:id',async (req,res)=>{
try{
  const deletedTodo = await todo.findByIdAndDelete(req.params.id)
if(deletedTodo){
  res.json({message:'todo deleted successfully'})
} else {
  res.json({message:'Todo is not found'})
}
   

}
catch(error){
  res.status(401).json({
    message:'failed to delete the todo',
    error:err.message
  })

}


})

app.put('todo/:id',async (req,res)=>{
try{
 const updatesTodo = await todo.findByIdAndUpdate(req.params.id,{
  title:req.body.title
 })
if(updatesTodo){
  res.json(updatesTodo)
} else {
  res.status(401).json({
    message:'Todo not found'
  })
}


}
catch(error){
  res.status(401).json({message:'failed to update todo',error:err.message})

}
})