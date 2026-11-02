import express from "express";
import {logger} from "./middlewares/logger.js"
import { requireAuth} from "./middlewares/auth-check.js";

const app =  express();

// MIDDLEWARE- PARASE INCOMING JSON REQUEST
app.use(express.json());

app.use(logger); 

const users = [
        {
            id: 1,  name: "Temitope"
        },

        {
            id: 2, name: "Gabriel"
        },

        {
            id: 3, name: "Taiwo"
        },

        {
            id: 4, name: "seun"
        },
        {
            id: 5, name: "seun"
        },
        {
            id: 6, name: "seun"
        },
        {
            id: 7, name: "seun"
        },
       
    ];

// define routes
app.get("/", (req, res) => {
    res.json({message: "welcome to the API"});      
});

app.get("/users", requireAuth, (req, res) =>{
    res.json({message: "Request successful",data: users});
})

app.get("/users",logger, (req, res)=>{
    // console.log(req.query);
    res.json({message: "Request Successful", data: users});
});

app.get("/users/:id", requireAuth, (req, res) => { 
const userId = parseInt(req.params.id);
const user = users.find((user) => user.id === userId); 

if (user === undefined){
    return res.status(404).json({message: "user not found"});
}

res.json({message: "Request Successful", data: user}); 

})
app.delete("/users/:id",(req, res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user)=> user.id===userId);

    if (userIndex === -1){
        return res.status(404).json({ message: "User not found"});
    }

    users.splice(userIndex, 1);
res.json({ message: "User deleted successfully"}); 
});
    
    

app.post("/users",(req, res)=>{
//     const { name, email } = req.body;
//     const userId = perseInt(req.params.id); 
//     const user = users.find((user)=> user.id === userId);
//     if (user === undefined) {
//         return res.status(404).json({ message: "user not found"});
//     }
// })
// app.get("/users", (req, res) => {
        
//  res.json({message: "Request Successful", data: users});
   const { name, email } = req.body;

   const newUser = { id: users.length + 1, name, email};

   users.push(newUser);

   res.status(201).json({message: "user created succesfully", data: newUser});

});


app.patch('/users/:id', (req, res)=>{
    const userId = parseInt(req.params.id); 
    const user = users.find((user)=>user.id === userId);
    if (!user){
        return res.status(404).json({message: "User not found"});
    }
    const {name, email} = req.body;

    if (name){
        user.name = name;
    }
    if (email){
        user.email = email;
    }
     users.at(users.indexOf(user), 1, user);

    res.json({message: "user updated successfully", data:user});
});


const PORT = 3000;
app.listen(PORT, () =>{ 
    console.log(`server is runing on port ${PORT}`); 
}); 

