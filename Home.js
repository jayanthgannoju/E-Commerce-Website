// Display the logged-in user's name
let user = document.getElementById("user");
user.innerText = localStorage.getItem("username");

// Function to fetch and display products
let fetchData = async () => {
    let data = await fetch("https://fakestoreapi.com/products");
    let finalData = await data.json();
    let container = document.getElementById("card_container");
    finalData.forEach((ele) => {
        container.innerHTML += `
        <main class="card">
            <img src=${ele.image} alt="${ele.title} Image"> 
            <h1>${ele.title.slice(0,28)}</h1>
            <p>${ele.description.slice(0, 80)}</p>
            <h1><b>Rs. ${ele.price}</b></h1>
            <section id="total-container">
                <button onclick='addToCart("${ele.title}", ${ele.price}, "${ele.image}")'>ADD TO CART</button>
                <a href="BuyNow.html?title=${encodeURIComponent(ele.title)}&price=${ele.price}&image=${encodeURIComponent(ele.image)}" id="buybutton">BUY NOW</a>
            </section>
        </main>
        `;
    });
};
fetchData();

let count = 0;
let cart = [];
let cartPrice = [];
let cart_value = document.getElementById("cart_value");

// Function to add items to the cart
let addToCart = (productTitle, productPrice, productImage) => {
    count++;
    cart_value.innerText = count;
    let finalObj = {
        name: productTitle,
        price: productPrice,
        image: productImage
    };
    cart.push(finalObj);
    cartPrice.push(productPrice);

    // Update the cart display
    updateCartDisplay();
    updateTotalPrice();
};

// Function to remove items from the cart
let removeFromCart = (index) => {
    cart.splice(index, 1);
    cartPrice.splice(index, 1);
    count--;
    cart_value.innerText = count;

    // Update the cart display
    updateCartDisplay();
    updateTotalPrice();
};

// Function to update the cart display
let updateCartDisplay = () => {
    let cartItems = document.getElementById("cart_items");
    cartItems.innerHTML = cart.map((item, index) => `
        <article id="single_cart">
            <img src="${item.image}" alt="${item.name} Image" style="width: 50px; height: 50px;">
            <h1>${item.name}</h1>
            <p>Rs.${item.price}</p>
            <button onclick="removeFromCart(${index})">X</button>
        </article>
    `).join('');
};

// Function to update the total price
let updateTotalPrice = () => {
    let finalPrice = cartPrice.reduce((storage, ele) => storage + ele, 0);
    let priceContainer = document.querySelector("#price_container");
    priceContainer.innerHTML = `
    <p>Your Total Price is: Rs.${Math.round(finalPrice)}</p>
    <a href="BuyNow.html" id="buy_now_button">Buy Now</a>
    `;
};


// @ for suggestion container

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search_input');
    const suggestionsContainer = document.getElementById('suggestions_container');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query.length > 0) {
            try {
                const response = await fetch(`https://your-api-endpoint/products?query=${encodeURIComponent(query)}`);
                const products = await response.json();

                if (products.length > 0) {
                    suggestionsContainer.style.display = 'block';
                    products.forEach(product => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.textContent = product.name; // Adjust if your API response structure is different
                        suggestionItem.classList.add('suggestion_item');
                        suggestionItem.addEventListener('click', () => {
                            searchInput.value = product.name;
                            suggestionsContainer.style.display = 'none';
                        });
                        suggestionsContainer.appendChild(suggestionItem);
                    });
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
