import express from 'express';
import { item } from './public/item.js';
const app = express();
const port = process.env.PORT || 3000

let cartItem = []
//middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

//routes
app.get('/', (req, res) => {
    res.render('home', {
        item
    })
})
app.get('/item/:id', (req, res) => {
    const id = req.params.id
    const product = item[id - 1];
    res.render('item', {
        item: product
    })
})
app.get('/cart', (req, res) => {



    res.render('cart', {
        items: cartItem,
        list: item
    }
    )
})

app.post('/addToCart/:id', (req, res) => {
    const id = Number(req.params.id);
    cartItem.push(id);
    res.redirect('/cart')
})

//listening
app.listen(port, function () {
    console.log(
        "Server running on port http://localhost:3000"
    )
})