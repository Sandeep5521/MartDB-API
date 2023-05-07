require('dotenv').config();
const express = require('express');
const app = express();
const con = require('./src/db.js');
const PORT = process.env.port || 4000;
const Products = require('./models/products.js');
const Category = require('./models/category.js');
const cors = require('cors')
const safe = require('./middleware/safe.js')
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
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
        if (req.query.page && req.query.limit) {
            const Count = await Products.find().count();
            const page = Number(req.query.page);
            const Limit = Number(req.query.limit);
            const Skip = (page - 1) * Limit;

            if (Skip < Count) {
                try {
                    const tmp = await Products.find({ category: req.query.cat }).select({
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
                const tmp = await Products.find({ category: req.query.cat }).select({
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

app.post('/Products', safe, async (req, res) => {
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

app.delete('/Products', async (req, res) => {
    if (req.query.id) {
        try {
            let tmp = await Products.findOne({ _id: req.query.id })
            console.log(tmp);
            tmp = await Category.updateOne({ title: tmp.category }, {
                $inc: {
                    products: -1
                }
            })
            console.log(tmp);
            tmp = await Products.deleteOne({ _id: req.query.id })
            console.log(tmp);
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(502)
        }
    }
    else res.sendStatus(401);
})

app.get('/Category', async (req, res) => {
    if (req.query.name) {
        try {
            const tmp = await Category.findOne({ title: req.query.name }).select({
                _id: 0,
                __v: 0
            });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502)
        }
    }
    else {
        try {
            const tmp = await Category.find().select({
                _id: 0,
                __v: 0
            }).sort({ date: -1 });
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502)
        }
    }
})

app.get('/search', async (req, res) => {
    if (req.query.q) {
        try {
            const tmp = await Products.aggregate([
                {
                    $search: {
                        index: "default",
                        text: {
                            query: req.query.q,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                },
                {
                    $project: {
                        description: 0,
                        images: 0,
                        date: 0,
                        brand: 0,
                        reviews: 0,
                        __v: 0
                    }
                }
            ]);
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502)
        }
    }
    else if (req.query.a) {
        try {
            const tmp = await Products.aggregate([
                {
                    $search: {
                        index: "auto",
                        autocomplete: {
                            query: req.query.a,
                            path: "title"
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1
                    }
                }
            ]);
            res.send(tmp);
        } catch (error) {
            res.sendStatus(502)
        }
    }
    else res.sendStatus(400);
})

app.get('/random', async (req, res) => {
    try {
        const len = (req.query.limit) ? Number(req.query.limit) : 1;
        const tmp = await Products.aggregate([
            { $sample: { size: len } },
            {
                $project: {
                    description: 0,
                    images: 0,
                    date: 0,
                    brand: 0,
                    reviews: 0,
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

