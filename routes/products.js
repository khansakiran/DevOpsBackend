var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    const products = await Product.find()
      .sort({ name: "desc" })
      .populate("reviews.userID");
    res.json({ products: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add product
router.post("/addProduct", async function (req, res) {
  const prod = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    reviews: [],
  });

  try {
    const newProduct = await prod.save();
    res.json({ success: newProduct });
  } catch (err) {
    console.log(err);
    res.json({ error: "AN error occured" });
  }
});

//add review
router.put("/addReview/:pid", async function (req, res) {
  try {
    const addReview = await Product.updateOne(
      { _id: req.params.pid },
      {
        $push: {
          reviews: {
            description: req.body.description,
            stars: req.body.stars,
            userID: req.body.userID,
          },
        },
      }
    );
    res.json(addReview);
  } catch (err) {
    res.send({ message: err });
  }
});

//delete review
router.put("/deleteReview/:pid", async function (req, res) {
  try {
    const delReview = await Product.updateOne(
      { _id: req.params.pid },
      {
        $pull: {
          reviews: { 
            _id: req.body._id 
          },
        },
      }
    );
    res.json(delReview);
  } catch (err) {
    res.send({ message: err });
  }
});

//view all reviews of a specific product
router.get("/viewReview/:pid", async function (req, res) {
  try {
    const user = await Product.find().populate('reviews.userID');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//admin routes

//update any product with ProductID
router.patch("/updateOne/:pid", async function (req, res) {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.pid },
      {
        $set: { 
          name: req.body.name, 
          price: req.body.price,
          quantity: req.body.quantity,
          image: req.body.image, 
        },
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.send({ message: err });
  }
});

// deleting any specific product with productID
router.delete("/deleteOne/:pid", function (req, res) {
  try {
    Product.findByIdAndRemove(req.params.pid, (err) => {
      res.json({ success: req.params.pid });
    });
  } catch (err) {
    console.log(err);
    res.json({ err: "AN error occured" });
  }
});

module.exports = router;
