const express = require('express');
const jwt = require('jsonwebtoken');
const types = require('./types');
const {Todo} = require('./model');
const cors = require('cors');
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json());

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = types.createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg:"you sent the wrong inputs",
        })
    }
    Todo.create({
        title: createPayload.title,
        description: createPayload.description
    }).then((response) => {
        console.log("this is created todo: ", response);
        res.json({
            msg: "todo created!"
        });
    }).catch(err=>{
        console.log("error while creating todo is: ", err);
        res.json({
            msg: "todo Not created - error"
        });
    })
})
app.get('/todos', async (req, res) => {
    const todos = Todo.find({}).then(response=>{
        console.log(response)
        res.json({
            todos:response,
        })
    })


})
app.put('/completed', async (req, res) => {
    const updatedPayload = req.body;
    const parsedPayload = types.updateTodo.safeParse(updatedPayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg:"you sent the wrong id",
        })
    }
    const updateTodo = await Todo.findOneAndUpdate({
        _id : updatedPayload.id
    },{$set:{completed: true}},{new:true}).then(response=>{
        console.log("the updated todo is: ", response)
        res.json({
            msg: "successful updation!"
        })
    }).catch(err=>{
        console.log("the error while updating todo is: ", err)
        res.json({
            msg: "failed updation"
        })
    })

})

app.listen(3000, ()=>{
    console.log("server running!")
})