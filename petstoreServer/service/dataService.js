const mongoose = require('mongoose')
const db = require('./db')
const jwt = require('jsonwebtoken')

const getAllItems = () => {
    return db.Item.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    Pets: result
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 402,
                    message: 'item not found'
                }
            }
        }
    )
}

const addtowishlist = (id, title, price, description, category, image) => {

    return db.Wishlist.findOne({id}).then(
        (result) => {
            if (result) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'item already exists'
                }
            }
            else {
                const newItem = new db.Wishlist({
                    id, 
                    title, 
                    price, 
                    description, 
                    category, 
                    image
                })
                newItem.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'item added successfully'
                }
            }
        }
    )

}

const getwishlist=()=>{
    return db.Wishlist.find().then(
        (result)=>{
            if(result){
                return {
                    status: true,
                    statusCode: 200,
                    Items: result
                }
            }
            else{
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Your wishlist is empty'
                }

            }

        }
    )
}

const deleteitem=(id)=>{
    // return db.Wishlist.find().then(
    //     (result)=>{
    //         if(result){
    //             return {
    //                 status: true,
    //                 statusCode: 200,
    //                 Items: result,
    //                 message:''
    //             }
    //         }
    //         else{
    //             return {
    //                 status: false,
    //                 statusCode: 401,
    //                 message: 'Your wishlist is empty'
    //             }

    //         }

    //     }
    // )
    return db.Wishlist.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return {
                //     status: true,
                //     statusCode: 200,
                //     message: 'item removedsuccessfully'
                // }
                return db.Wishlist.find().then(
                    (result)=>{
                        if(result){
                            return {
                                status: true,
                                statusCode: 200,
                                Wishlist: result,
                                message: 'item removed successfully'
                            }
                        }
                        else{
                            return {
                                status: false,
                                statusCode: 401,
                                message: 'Your wishlist is empty'
                            }
            
                        }
            
                    }
                )
            }
            else{
                return{
                    status: false,
                    statusCode: 404,
                    message: 'item not exist'
                }
            }
        }
    )
}
const register = (acno, username, pass) => {
    return db.User.findOne({ acno })
      .then(User => {
        if (User) {
          return {
            statuscode: 401,
            status: false,
            message: 'User already registered'
          }
        }
        else {
          const newUser = new db.User({
            acno,
            username,
            pass
          })
          newUser.save()
          return {
            statuscode: 200,
            status: true,
            message: 'Successfully registered'
          }
        }
      })
  
  
  }
  const login = (acno, pswd) => {
    return db.User.findOne({
      acno,
      pass: pswd
    })
      .then(User => {
        if (User) {
          currentUser = User.username;
          currentacno = acno;
          //token generate
          const token = jwt.sign({ currentacno: acno }, 'superkey2020')
          return {
            statusCode: 200,
            status: true,
            message: 'Login Successfully',
            currentUser,
            currentacno,
            token
          }
  
        }
        else {
  
          return {
            statusCode: 401,
            status: false,
            message: 'incorrect password or username'
          }
        }
      })
  }


module.exports = {
    getAllItems,
    addtowishlist,
    getwishlist,
    deleteitem,
    register,
    login

}