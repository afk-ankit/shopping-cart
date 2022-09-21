import cookieParser from 'cookie-parser';
import express from 'express';
import { item } from './public/item.js';
const app = express();
const port = process.env.PORT || 3000
let foundItem = []



const validateCookie = (req, res, next) => {
    const cookie = req.cookies.cartItems;
    if (cookie) {
        console.log('Found Cookies')
        foundItem = cookie;
        foundItem.push(req.params.id)
        next();
    }
    else if (!cookie) {
        console.log('No cookies')
        foundItem = [req.params.id]
        next()
    }
}

//middlewares
app.use(cookieParser())
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
    const found = []
    const cartItem = req.cookies.cartItems
    if (cartItem)
        cartItem.forEach((i) => {
            found.push(item[i - 1])
        })

    let total = found.reduce((total, element) => {
        return total + Number(element.price)
    }, 0)

    total = Math.round(total)

    res.render('cart', {
        items: cartItem,
        list: found,
        total
    }
    )
})

app.post('/addToCart/:id', validateCookie, (req, res) => {
    res.cookie('cartItems', foundItem)
    res.redirect('/cart')
})

app.post('/removeFromCart/:id', (req, res) => {
    const cartItem = req.cookies.cartItems
    cartItem.splice(req.params.id, 1)
    res.cookie("cartItems", cartItem)
    res.redirect('/cart')
})


app.get('/cookie', (req, res) => {
    const { cookies } = req;
    res.send(cookies)
    console.log(cookies)
})

app.get("/cookieset", (req, res) => {
    res.cookie('cartItems', [1, 24, 235, 235, 2]);
    res.redirect('/cookie')
})

//listening
app.listen(port, function () {
    console.log(
        "Server running on port http://localhost:3000"
    )
})


