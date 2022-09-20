const button = document.querySelectorAll('.main-button');
const cartItems = []
button.forEach((item) => {
    const id = item.parentElement.firstElementChild.innerText;
    item.addEventListener('click', () => {
        console.log('clicked')
        cartItems.push(Number(id))
        console.log(cartItems)
    })
})

