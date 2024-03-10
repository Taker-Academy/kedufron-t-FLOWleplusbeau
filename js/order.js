const apiUrl = 'https://api.kedufront.juniortaker.com/order/';

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const order = {
        email: email,
        name: name,
        address: address,
        cart: cart.map(item => ({
            id: item.id,
            amount: item.amount
        }))
    };

    const data = JSON.stringify(order);

    console.log('Order:', data);
    axios.post(apiUrl, order)
        .then(function(response) {
            console.log('Order successful:', response);
            localStorage.removeItem('cart');
            window.location.href = 'comfirmation.html';
        })
        .catch(function(error) {
            console.error('Order failed:', error);
        });
});