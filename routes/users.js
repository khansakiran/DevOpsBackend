var express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/", async function (req, res) {
  try {
    const user = await User.find()
      .populate("order")
      .populate("order.productIDList")
      .populate("wishList.productIDList");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//register a new user
router.post("/RegisterUser", async function (req, res) {
  const user = new User({
    username: req.body.username,
    email:req.body.email,
    phone:req.body.phone,
    address: req.body.address,
    balance: req.body.balance,
    password:req.body.password,
    wishList: [],
    order: [],
  });

  try {
    const newUser = await user.save();
    console.log(newUser);
    res.json({ success: newUser });
  } catch (err) {
    console.log(err);
    res.json({ error: "AN error occured" });
  }
});
router.post('/login', async (req, res) => {
  try {
    console.log(req.body.email)
    console.log(req.body.password)
    const user = await User.findOne({email: req.body.email, password: req.body.password})
    if (user == null) {
      return res.json({success: false})

    }
    return res.json({success: true, user: user})
  } catch(e) {
    res.json({ error: "AN error occured" });

  }
})
//add a new order
router.put("/addOrder", async function (req, res) {
  try {
    console.log('here')
    const addOrder = await User.updateOne(
      { _id: mongoose.Types.ObjectId('63eb53691ef9beb23b44d1f0') },
      {
        $push: {
          order: {
            orderDate: req.body.orderDate,
            deliveryDate: req.body.deliveryDate,
            price: req.body.price,
            productIDList: req.body.productIDList,
          },
        },
      }
    );
    console.log('here 2')
    res.json(addOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//view orders
router.get("/viewOrders/:uid", async function (req, res) {
  try {
    const user = await User.find()
      .populate("order")
      .populate("order.productIDList");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add product to wishlist
router.put("/addToWishlist/:uid", async function (req, res) {
  try {
    const addToWishlist = await User.updateOne(
      { _id: req.params.uid },
      {
        $push: {
          wishList: {
            productIDList: req.body.productIDList,
          },
        },
      }
    );
    res.json(addToWishlist);
  } catch (err) {
    res.send({ message: err });
  }
});

//view wishlist of user
router.get("/viewWishlist/:uid", async function (req, res) {
  try {
    const user = await User.find().populate("wishList.productIDList");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
