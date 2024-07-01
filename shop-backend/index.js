import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



const port = 4000;
const app = express()


app.use(express.json())
app.use(cors())


//Database Connection - mongoDb
mongoose.connect("mongodb+srv://Srinath_G:SUeujbwHS1HAKE4n@srinathcluster0.kxmbred.mongodb.net/e-commerce")

//api creation
app.get("/", (req, res) => {
    res.send("Express app running bruh!")
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const upload = multer({ storage: storage })

//create upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//creating mongoose schema for products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }

})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id;
    if (products.length > 0) {

        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    else {
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product)
    await product.save()
    console.log('saved')
    res.json({
        success: true,
        name: req.body.name
    })

})

//create api for delete products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log('Removed succesfully')
    res.json({
        success: true,
        name: req.body.name
    })
})

//create api for reading all products
app.get('/allproducts', async (req, res) => {
    let prodcuts = await Product.find({})
    console.log("fetched all products")
    res.send(prodcuts)
})



//creating endpoint for new collection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8)
    console.log("New collection fetched")
    res.send(newCollection)
})

//creating endpoint for populat in women category
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: 'wommen' })
    let popular_in_women = products.slice(0, 4)
    console.log('popular in women fetched')
    res.send(popular_in_women)

})


app.use(userRouter)
app.use(cartRouter)
app.use(orderRouter)


//port configure
app.listen(port, error => {
    if (!error) {
        console.log("Server running on port: " + port)
    }
    else {
        console.log("Error: " + error)
    }
})

