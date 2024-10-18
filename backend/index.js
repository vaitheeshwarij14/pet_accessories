require('dotenv').config(); 
const port = 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL,{
    serverSelectionTimeoutMS: 50000 

})
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));


app.use('/images', express.static('upload/images'));

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

app.get("/", (req, res) => {
    res.send("Express app is running");
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
const Product = mongoose.model("Product", {
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
    pricePerKg: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, pricePerKg } = req.body;
        if (!name || !image || !category || !pricePerKg) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        let products = await Product.find({});

        let id;
        if (products.length > 0) {
            let last_product = products[products.length - 1];
            id = last_product.id + 1; 
        } else {
            id = 1; 
        }
        const newProduct = new Product({
            id: id,
            name,
            image,
            category,
            pricePerKg,
        });
        await newProduct.save();
        res.json({
            success: true,
            name,
            id,
        });
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
});
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Array,  
        default: [],  
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: 'User already exists' });
        }
        const cart = [];

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
});

app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user)
    {
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"})
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
      const deletedProduct = await Product.findOneAndDelete({ _id: req.body.id }); 
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({
        success: true,
        message: "Product removed successfully"
      });
    } catch (err) {
      console.error("Error removing product:", err);
      res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
  });
  

app.post('/updateproduct', async (req, res) => {
    try {
        const { id, name, pricePerKg, category } = req.body;
                if (!id || !name || !pricePerKg || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            { name, pricePerKg, category },
            { new: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
});
app.get('/allproducts', async (req, res) => {
    try {
        const { category } = req.query; 
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }

        let products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
});
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Server connection error: " + error);
    }
});
