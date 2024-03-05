// Define the URL of the API you want to fetch data from
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

// Define the addToCart function
const addToCart = (item) => {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

const addItemToContainer = (item, item_container) => {
    const itemDiv = document.createElement('div',);
    itemDiv.classList.add('item');
    const titleElment = document.createElement('h4');
    const imgElement = document.createElement('img');
    const priceElement = document.createElement('p');
    const addToCartButton = document.createElement('button');

    titleElment.textContent = item.name;
    imgElement.src = apiUrl + 'picture/' + item._id;
    priceElement.textContent = item.price;
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => addToCart(item));
    itemDiv.appendChild(titleElment);
    itemDiv.appendChild(imgElement);
    itemDiv.appendChild(priceElement);
    itemDiv.appendChild(addToCartButton);
    item_container.appendChild(itemDiv);
}

const DisplayItems = async () => {
    const data = await fetchData();
    let item_container = document.querySelector('.item-container');
    data.forEach(item => {
        addItemToContainer(item, item_container);
    });
}

DisplayItems();
