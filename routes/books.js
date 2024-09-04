const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const router = express.Router();

module.exports = router;

/**
 * router: /books
 * method: Get
 * description: get all the books
 * Acess:public 
 * parameter:none
 */

router.get("/" , (req,res) => {
    return res.status(200).json({sucess: true, books:books})
})

/**
 * router:/books/:id
 * method: Get
 * description: Get books by id
 * acess: public
 * parameters:None
 */

router.get("/:id" , (req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id==id);
    if(!book){
        return res.status(404).json({success: false,message:"book not exist",})
    }
    return res.status(200).json({sucess:true,books:book})
})

/**
 * router:/books
 * method: Post
 * description:add new book
 * access: public
 * parameters: none
 */

router.post("/", (req,res) => {
    const{id,name,author,gener,price,publisher} = req.body;
    const book = books.find((each) => each.id==id);
    if(book){
        return res.status(400).json({sucess:false,message:"book already exist"})
    };
    books.push({
        id,
        name,
        author,
        gener,
        price,
        publisher

    })

    return res.status(200).json({sucess:true,message:"succesfuly added",books:books})
});

/**
 * router:/books/id
 * method: Put
 * description:update book by id
 * access: public
 * parameters: id
 */

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each) => each.id==id);
    const {data} = req.body;
    if(!book){
        return res.status(404).json({sucess:false,message:"book not exist"})
    }
    const updatebook = books.map((each)=>{
        if(each.id==id){
            return{
                ...each,
                ...data
            }
        }
        return each
    })

    return res.status(200).json({sucess:true,message:"sucessfully updated", books:updatebook})


})

/**
 * router:/books/id
 * method: Delete
 * description:delete book by id
 * access: public
 * parameters: id
 */

router.delete("/:id", (req,res)=>{const {id} = req.params;const book = books.find((each)=> each.id==id);if(!book){return res.status(404).json({sucess:false,message:"book not exist"})};const index = books.indexOf(book);books.splice(index,1);return res.status(200).json({sucess:true,message:"sucessfuly deleted",books:books})})

/**
 * router:/books/issued
 * method: Get 
 * description:get all issued books
 * access: public
 * parameters: None
 */

router.get("/issued/user", (req,res) => {
    const userwithissuedbooks = users.filter((each) => {
        if(each.issuedBook) return each
    });
    const issuedbook=[];
    userwithissuedbooks.forEach((each)=> {
        const book = books.find((book) => each.issuedBook==book.id);

        book.issuedto = each.name;
        book.issuedDate= each.issuedDate;
        book.returnDate= each.returnDate;

        issuedbook.push(book);
    });
        if(issuedbook == 0){
            return res.status(404).json({
                success: false,
                message:"no book have been issued Yet",
            })
        }
        return res.status(200).json({
            success:true,
            data:issuedbook,
        })

});



