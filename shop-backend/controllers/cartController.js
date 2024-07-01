import userModel from "../models/userModel.js";

//add items in cart
const addToCart = async(req,res) => {

    console.log('Added', req.body.itemId)
    let userData = await userModel.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1
    await userModel.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send(' Added ')
}


//remove items from cart
const removeFromCart = async(req,res) => {

    console.log('removed', req.body.itemId)
    let userData = await userModel.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await userModel.findOneAndUpdate({ _id:req.user.id }, { cartData:userData.cartData })
    res.send(' removed ')
}

//fetch user cart data
const getCart = async(req,res) => {
    console.log('Get Cart')
    let userData = await userModel.findOne({_id:req.user.id})
    res.json(userData.cartData)
}

export {addToCart,removeFromCart,getCart}
