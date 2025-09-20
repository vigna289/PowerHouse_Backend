
const Product = require("../models/product.model");
const Category = require("../models/category.model.js"); // Adjust path


async function createProduct(reqData)
{
    let topLevel= await Category.findOne({name:reqData.topLevelCategory});

    if(!topLevel)
    {
        topLevel=new Category({
            name:reqData.topLevelCategory,
            level:1
        })
        await topLevel.save();
    }
    
    let secondLevel = await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    })
    
    if(!secondLevel)
        {
            secondLevel=new Category({
                name:reqData.secondLevelCategory,
                parentCategory: topLevel._id,
                level:2,
            })
            await secondLevel.save();
        }
        let thirdLevel = await Category.findOne({
            name:reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
    })
    
    if(!thirdLevel)
    {
        thirdLevel=new Category({
            name:reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level:3,
        })
        await thirdLevel.save();
    }
    
    const product = new Product({
        title : reqData.title,
        color : reqData.color,
        description : reqData.description,
        discountedPrice : reqData.discountedPrice,
        discountPersent : reqData.discountPersent,
        imageUrl : reqData.imageUrl,
        brand : reqData.brand,
        price : reqData.price,
        sizes : reqData.size,
        quantity : reqData.quantity,
          category: {
    topLevel: topLevel._id,
    secondLevel: secondLevel._id,
    thirdLevel: thirdLevel._id
  },

    })

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return "Product Deleted Successfully";
}

async function updateProduct(productId,reqData) {
    return await Product.findByIdAndUpdate(productId,reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id)
      .populate({
        path: "category",
        populate: [
          { path: "parentCategory", // second level
            populate: { path: "parentCategory" } // top level
          }
        ]
      })
      .exec();

    if (!product) {
        throw new Error("Product not found with id " + id);
    }
    return product;
}


async function getAllProducts(reqData) {
  let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqData;

  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 0;
  minPrice = Number(minPrice) || 0;
  maxPrice = Number(maxPrice) || 0;
  minDiscount = Number(minDiscount) || 0;
  color = color && color !== "undefined" ? color : "";
  sizes = sizes && sizes !== "undefined" ? sizes : "";
  stock = stock && stock !== "null" ? stock : null;

  let filter = {};

  // Category filter
  if (category) {
    const existCategory = await Category.findOne({
      name: { $regex: `^${category}$`, $options: "i" }, level:3
    });

    console.log("ExistCategory:", existCategory);

    if (existCategory) {
      filter.$or = [
        { "category.topLevel": existCategory._id },
        { "category.secondLevel": existCategory._id },
        { "category.thirdLevel": existCategory._id },
      ];
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Color filter
  if (color) {
    const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
    const colorRegex = new RegExp([...colorSet].join("|"), "i");
    filter.color = colorRegex;
  }

  // Sizes filter
  if (sizes) {
    const sizesSet = new Set(sizes.split(",").map(s => s.trim()));
    filter["sizes.name"] = { $in: [...sizesSet] };
  }

  // Price filter
  if (minPrice || maxPrice) {
    filter.discountedPrice = {};
    if (minPrice) filter.discountedPrice.$gte = minPrice;
    if (maxPrice > 0) filter.discountedPrice.$lte = maxPrice;
  }

  // Discount filter
  if (minDiscount) {
    filter.discountPersent = { $gte: minDiscount };
  }

  // Stock filter
  if (stock) {
    if (stock === "in_stock") filter.quantity = { $gt: 0 };
    else if (stock === "out_of_stock") filter.quantity = { $lte: 0 };
  }

  console.log("Final Filter:", filter);

  const total = await Product.countDocuments(filter);

  let query = Product.find(filter)
    .populate("category.topLevel")
    .populate("category.secondLevel")
    .populate("category.thirdLevel");

  // Sorting
  if (sort === "price_low") query = query.sort({ discountedPrice: 1 });
  if (sort === "price_high") query = query.sort({ discountedPrice: -1 });

  const products = await query.skip(pageNumber * pageSize).limit(pageSize);

  console.log("Products fetched:", products.length);
  products.forEach(p => console.log(p.imageUrl));



  return {
    content: products,
    currentPage: pageNumber + 1,
    totalPages: Math.ceil(total / pageSize),
  };
}



async function createMultipleProduct(products)
{
    for(let product of products)
    {
        await  createProduct(product);
    }
}

module.exports={createProduct,deleteProduct,updateProduct,getAllProducts,findProductById,createMultipleProduct}