import mongoose from "mongoose";

main()
.then( () => console.log('Connected to the mongoDB database'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todoapplication');
}

const todoSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    done: Boolean,
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

export const Todo = mongoose.models.Todo || mongoose.model('Todo' , todoSchema);
export const User = mongoose.models.User || mongoose.model('User' , userSchema);