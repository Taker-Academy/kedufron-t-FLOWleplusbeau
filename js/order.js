const apiUrl = 'https://api.kedufront.juniortaker.com/order/';

// Function to post order to the API
async function postOrder(order) {
    axios.post(apiUrl, order)
        .then(function(response) {
            if (response.status !== 201) {
                console.error('Order failed:', response);
            } else {
                console.log('Order successful:', response);
                localStorage.removeItem('cart');
                window.location.href = 'comfirmation.html';
            }
        })
        .catch(function(error) {
            console.error('Order failed:', error);
        });
}

// Event listener for the checkout form
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // create order object
    const order = {
        email: email,
        name: name,
        address: address,
        cart: cart.map(item => ({
            id: item.id,
            amount: item.amount
        }))
    };

    // convert order object to JSON
    const data = JSON.stringify(order);

    console.log('Order:', data);
    postOrder(order);
});