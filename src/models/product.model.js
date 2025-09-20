const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    discountedPrice:{
        type:Number,
    },
    discountPersent:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
    },
    color:{
        type:String,
    },
    sizes:[{
        name:{type:String},
        quantity:{type:Number}
    }],
    imageUrl:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'reviews',
       },
    ],
category: {
  topLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  secondLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  thirdLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
},

    createdAt:{
        type:Date,
        default:Date.now(),
    },
});

const Product=mongoose.model('products',productSchema);

module.exports=Product;