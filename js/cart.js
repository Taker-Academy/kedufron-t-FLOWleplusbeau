const apiUrl = 'https://api.kedufront.juniortaker.com/item/';

const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response);
    }
}

// Define the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const incrementAmount = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    item.amount++;
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

const decrementAmount = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    if (item.amount > 1) {
        item.amount--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

const addCartItemToContainer = (item, cartItem, cart_container) => {
    const itemDiv = document.createElement('div',);
    itemDiv.classList.add('cart-item');
    itemDiv.setAttribute('id', item._id);
    let price = item.price * cartItem.amount;
    price = price.toFixed(2);

    itemDiv.innerHTML = `
        <img src="${apiUrl}picture/${item._id}" alt="${item.name}"/>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${price}€</p>
            <div class="amount-container">
                <button onclick="decrementAmount(${item._id})">-</button>
                <p>nombre: ${cartItem.amount}</p>
                <button onclick="incrementAmount(${item._id})">+</button>
            </div>
            <div class="action-container">
                <a href="html/product.html?id=${item._id}">Voir produit</a>
                <button onclick="removeItem(${item._id})">Enlever du panier</button>
            </div>
        </div>
    `;
    cart_container.appendChild(itemDiv);
}

const removeItem = (id) => {
    const itemDiv = document.getElementById(id);

    cart = cart.filter(cartItem => cartItem.id !== id);
    itemDiv.remove();
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

const DisplayCart = async () => {
    const data = await fetchData();
    let cart_container = document.querySelector('.cart-items');
    cart.forEach(cartItem => {
        const item = data.find(item => item._id.toString() === cartItem.id.toString());
        if (item) {
            addCartItemToContainer(item, cartItem, cart_container);
        }
    });

    let total = 0;
    cart.forEach(cartItem => {
        const item = data.find(item => item._id.toString() === cartItem.id.toString());
        total += item.price * cartItem.amount;
    });
    total = total.toFixed(2);
    document.getElementById('total').innerText = `Total: ${total}€`;
}

DisplayCart();