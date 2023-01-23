const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/petstore',()=>{
 console.log("Connected to MongoDB");
})

const Item =mongoose.model('Item',{
      
    id:Number,
    title:String,
    price:Number,
    description:String,
    item:String,
    category:String,
    image:String


})
const  Wishlist=mongoose.model('Wishlist',{
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String

})

const User = mongoose.model('User', {
    acno:Number,
    username:String,
    pass:String
})


module.exports ={
    Item,
    Wishlist,
    User
}