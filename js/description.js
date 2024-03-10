const apiUrl = 'https://api.kedufront.juniortaker.com/item/';

// Define the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// If the item is already in the cart, increase the amount
// If the item is not in the cart, add it with an amount of 1
const addToCart = (id) => {
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {

        existingItem.amount += 1;
    } else {
        cart.push({ id: id, amount: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}
const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response);
    }
}

function getProductID() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    id = parseInt(id);
    return id;
}

async function getProduct(id) {
    const data = await fetchData();
    let product;
    data.forEach(item => {
        if (item._id === id) {
            console.log('');
            product = item;
        }
    });
    return product;
}
async function displayProduct(id) {
    const product = await getProduct(id);
    const productDiv = document.querySelector('.product-description');
    productDiv.innerHTML = `
        <h4>${product.name}</h4>
        <img src="${apiUrl}picture/${product._id}" alt="${product.name}" />
        <p>${product.price}</p>
        <p>${product.description}</p>
        <button onclick="addToCart('${product._id}')">Ajouter au panier</button>
    `;
}

displayProduct(getProductID());