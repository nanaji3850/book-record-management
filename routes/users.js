const express = require("express");

const {users} = require("../data/users.json");

const routers = express.Router();

routers.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        data:users,
    });
});

routers.get("/:id", (req,res) => {
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

routers.post("/", (req,res) => {
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

routers.put("/:id", (req,res) => {
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

routers.delete("/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id==id);
    if(!user){
        return res.status(404).json({success:false,message:"user doesn't exist"})
    }
    const index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({success:true,message:"user deleted sucesfuly",data:users})

});

module.exports = routers;


