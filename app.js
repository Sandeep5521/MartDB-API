require('dotenv').config();
const express = require('express');
const app = express();
const con = require('./src/db.js');
const PORT = process.env.port || 4000;
const Products = require('./models/products.js');
const Category = require('./models/category.js');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<div style="height:100%;display:flex;justify-content:center;align-items: center;"><h1>hello i m live !!!</h1></div>')
})

app.get('/products', async (req, res) => {
    if (req.query.name) {
        const str = req.query.name;
        try {
            const tmp = await Products.findOne({ title: str }).select({
                date: 0,
                __v: 0
            });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502);
        }

    }
    else if (req.query.cat) {
        try {
            const tmp = await Products.find({ category: req.query.tag }).select({
                description: 0,
                category: 0,
                images: 0,
                date: 0,
                brand: 0,
                reviews: 0,
                __v: 0
            });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502)
        }
    }
    else if (req.query.id) {
        try {
            const tmp = await Products.findOne({ _id: req.query.id }).select({
                date: 0,
                __v: 0
            });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502);
        }
    }
    else if (req.query.page && req.query.limit) {
        const Count = await Products.find().count();
        const page = Number(req.query.page);
        const Limit = Number(req.query.limit);
        const Skip = (page - 1) * Limit;

        if (Skip < Count) {
            try {
                const tmp = await Products.find().select({
                    description: 0,
                    category: 0,
                    images: 0,
                    date: 0,
                    brand: 0,
                    reviews: 0,
                    __v: 0
                }).skip(Skip).limit(Limit).sort({ date: -1 });
                res.send(tmp);
            } catch (error) {
                res.sendStatus(502);
            }
        }
        else res.sendStatus(404);
    }
    else {
        try {
            const tmp = await Products.find().select({
                description: 0,
                category: 0,
                images: 0,
                date: 0,
                brand: 0,
                reviews: 0,
                __v: 0
            }).sort({ date: -1 });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502);
        }
    }
})

app.post('/Products', async (req, res) => {
    try {
        const tmp = await Products.insertMany([req.body]);
        const li = req.body.category;
        console.log(li);
        let result = await Category.findOne({ title: li })
        if (!result) {
            result = await Category.insertMany([{
                title: li,
                thumbnail: req.body.thumbnail
            }])
        }
        result = await Category.updateOne({ title: li }, {
            $inc: {
                products: 1
            }
        })
        console.log(result);
        res.send(tmp);
    } catch (error) {
        res.sendStatus(502)
    }
})

app.get('/Category', async (req, res) => {
    try {
        const tmp = await Category.find().select({
            _id: 0,
            __v: 0
        }).sort({ date: -1 });
        res.send(tmp);
    } catch (error) {
        res.sendStatus(502)
    }
})

app.get('/random', async (req, res) => {
    try {
        const tmp = await Products.aggregate([
            { $sample: { size: 1 } },
            {
                $project: {
                    date: 0,
                    __v: 0
                }
            }
        ]);
        res.send(tmp);
    } catch (error) {
        res.sendStatus(502);
    }
})

app.get('*', (req, res) => {
    res.sendStatus(404);
})
const start = async () => {
    await con(process.env.MONGODB_URL);
    app.listen(PORT, () => {
        console.log('server runs');
    })
}
start();

