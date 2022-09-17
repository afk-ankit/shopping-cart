const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, function () {
    console.log(
        "Server running on port http://localhost:3000"
    )
})