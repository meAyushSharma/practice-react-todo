const mongoose = require('mongoose');

mongoose.connect('mongodb_url_here').then(()=>{
    console.log("connected to database successfully");
}).catch(err=> {
    console.log(`the error connecting to database is: ${err}`);
});

const todoSchema = mongoose.Schema({
    title: String,
    description : String,
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todo', todoSchema);

module.exports = { Todo };




