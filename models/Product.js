var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  image:{
    type: String,
  },
  reviews: [
    {
      description: {
        type: String,
      },
      stars: {
        type: Number,
      },
      userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Products", ProductSchema);
