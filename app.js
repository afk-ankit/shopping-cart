const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, function () {
    console.log(
        "Server running on port http://localhost:3000"
    )
})