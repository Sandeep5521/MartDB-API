const path = require('path')
const Category = require(path.join(__dirname, '../models/category.js'));

const safe = async (req, res, next) => {
    let tmp = await Category.findOne({ title: req.body.category })
    if (!tmp) res.sendStatus(400);
    else next();
}

module.exports = safe;

