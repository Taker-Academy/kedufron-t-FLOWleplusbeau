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

const addItemToContainer = (item, item_container) => {
    const itemDiv = document.createElement('div',);
    itemDiv.classList.add('item');
    const titleElment = document.createElement('h4');
    const imgElement = document.createElement('img');
    const priceElement = document.createElement('p');

    titleElment.textContent = item.name;
    imgElement.src = apiUrl + 'picture/' + item._id;
    priceElement.textContent = item.price;
    itemDiv.appendChild(titleElment);
    itemDiv.appendChild(imgElement);
    itemDiv.appendChild(priceElement);
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