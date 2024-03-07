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

const addCartItemToContainer = (item, cart_container) => {
    const itemDiv = document.createElement('div',);
    itemDiv.classList.add('cart-item');
    const titleElment = document.createElement('h4');
    const imgElement = document.createElement('img');
    const priceElement = document.createElement('p');

    titleElment.textContent = item.name;
    imgElement.src = apiUrl + 'picture/' + item._id;
    priceElement.textContent = item.price;
    itemDiv.appendChild(imgElement);
    itemDiv.appendChild(titleElment);
    itemDiv.appendChild(priceElement);
    cart_container.appendChild(itemDiv);
}

const DisplayCart = async () => {
    const data = await fetchData();
    let cart_container = document.querySelector('.cart-items');
    cart.forEach(cartItem => {
        const item = data.find(item => item._id === cartItem.id);
        addCartItemToContainer(item, cart_container);
    });
}

DisplayCart();