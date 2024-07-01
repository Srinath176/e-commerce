import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"

//signup user
const registerUser = async(req,res) => {

    let check = await userModel.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: 'existing user found with same email address ' })
    }

    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }
    const user = new userModel({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart

    })
    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom') //generate jwt token
    res.json({ success: true, token })
}

//login user

const loginUser = async(req,res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        const passwordCompare = req.body.password === user.password;
        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom') //generate jwt token
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, errors: "Wrong Password" })
        }

    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
}


export {registerUser,loginUser}
