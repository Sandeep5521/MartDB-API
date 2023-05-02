const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// mongoose.connect("mongodb://localhost:27017/mdb") //{ useNewUrlParser: true, useUnifiedTopology: true}
//     .then(() => {
//         //console.log("connection Successful");
//     }, (err) => {
//         console.log(err);
//     });
const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: Number,
    brand: String,
    category: {
        type: String,
        lowercase: true,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    reviews: [
        {
            _id: false,
            name: String,
            review: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

const Products = new mongoose.model("Products", productSchema);
module.exports = Products;