var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  balance: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  wishList: [
    {
      productIDList: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
      ],
    },
  ],
  order: [
    {
      orderDate: {
        type: Date,
        default: Date.now,
      },
      deliveryDate: {
        type: Date,
        default: Date.now,
      },
      price: {
        type: Number,
        required: true,
      },
      productIDList: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
      ],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
