const express = require("express");

const {users,user} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

/**
 * Routes: /users
 * Methods: GET
 * Description: Get all users
 * Access: public
 * Parameters: None
 */

app.get("/users", (req,res) => {
    res.status(200).json({
        success: true,
        data:users,user,
    });
});
app.get("/",(req,res) => {
    res.status(200).json({
        message: "Server is up and running :-)",
    });
});

app.listen(PORT, ()=>{
    console.log('server is running at port ${PORT}');
});

