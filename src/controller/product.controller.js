const productService= require("../services/product.service.js")
const Category = require("../models/category.model.js");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
};

const createProduct = async (req,res) =>{
    try
    {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}
const deleteProduct = async (req,res) =>{
    const productId=req.params.id;
    try
    {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}
const updateProduct = async (req,res) =>{
    const productId=req.params.id;
    try
    {
        const product = await productService.updateProduct(productId,req.body);
        return res.status(201).send(product);
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}
const findProductById = async (req,res) =>{
    const productId=req.params.id;
    try
    {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product);
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}
const getAllProducts = async (req,res) =>{
    const productId=req.params.id;
    try
    {
          console.log("Query received:", req.query);
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(products);
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}
const createMultipleProduct = async (req,res) =>{
    const productId=req.params.id;
    try
    {
        const product = await productService.createMultipleProduct(req.body);
        return res.status(201).send({message:"Products Created Successfully"});
    }
    catch(error)
    {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById,
    getAllCategories,
}