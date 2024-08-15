const express = require("express");

const {users} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

/**
 * Routers: /users
 * Methods: GET
 * Description: Get all users
 * Access: public
 * Parameters: None
 */

app.get("/users", (req,res) => {
    res.status(200).json({
        success: true,
        data:users,
    });
});

/**
 * Router: /users/:id
 * Methods: GET
 * Description: Get one specific User
 * Access: Piblic
 * Parameters: None
 */

app.get("/users/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id == id);
    if (!user){
        return res.status(404).json({
            sucess:false,
            message:"user not found",
        })
    }
    return res.status(200).json({
        sucess:true,
        message:"user found",
        data:user,
    })
})

/**
 * Router: /users
 * Methods: POST
 * Description: Add new user
 * Access: Piblic
 * Parameters: None
 */

app.post("/users", (req,res) => {
    const {id,name,surname,issuedbook,issueddate,returndate,subscriptiontype,subscriptiondate} = req.body;
    const user = users.find((each) => each.id == id);
    if(user){
        return res.status(404).json({
            sucess: false,
            message: "user already there"
        })
    }
    users.push({
        id,
        name,
        surname,
        issuedbook,
        issueddate,
        returndate,
        subscriptiontype,
        subscriptiondate,
    });

    return res.status(201).json({
        sucess: true,
        message: "user added succesfully",
        data: users,
    })
})

/**
 * Router: /users/:id
 * Methods: PUT
 * Description: update user by id
 * Access: Piblic
 * Parameters: id
 */
app.put("/users/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id ==id);
    if(!user){
        return res.status(404).json({
            sucess:false,
            message:"user not found",
        });
    }
    const updatesuerdata = users.map((each) => {
        if (each.id ==id ){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        sucess:true,
        message:"user updated",
        udate:updatesuerdata,
    })

    });

 



app.get("/",(req,res) => {
    res.status(200).json({
        message: "Server is up and running :-)",
    });
});

app.listen(PORT, ()=>{
    console.log('server is running at port ${PORT}');
});

