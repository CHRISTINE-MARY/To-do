 const { request } = require('express');
const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }

},
{
    timestamps:true
});

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;