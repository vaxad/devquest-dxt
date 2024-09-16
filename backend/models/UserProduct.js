const mongoose = require('mongoose');

const { Schema } = mongoose;
const userPdtSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
  });
  const UserProduct=mongoose.model('testuserproduct',userPdtSchema);
  module.exports=UserProduct;