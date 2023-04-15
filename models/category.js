const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// mongoose.connect("mongodb://localhost:27017/mdb") //{ useNewUrlParser: true, useUnifiedTopology: true}
//     .then(() => {
//         //console.log("connection Successful");
//     }, (err) => {
//         console.log(err);
//     });
const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String,
        required: true
    },
    products: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;