// Function to display order summary
let displayOrderSummary = () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let orderDetails = document.getElementById('order_details');
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    let itemsHTML = cartItems.map(item => `
        <div>
            <img src="${item.image}" alt="Product Image" style="width: 100px; height: 100px;">
            <p>${item.name}</p>
            <p>Rs.${item.price}</p>
        </div>
    `).join('');

    orderDetails.innerHTML = `
        ${itemsHTML}
        <h3>Total Price: Rs.${totalPrice}</h3>
    `;
}

// Function to handle back to home button click
let handleBackToHome = () => {
    window.location.href = 'index.html'; // Adjust to your home page URL
}

// Function to handle confirm payment button click
let handleConfirmPayment = () => {
    let selectedPayment = document.querySelector('input[name="payment_method"]:checked');
    if (selectedPayment) {
        alert(`Payment method selected: ${selectedPayment.value}`);
        // Redirect to home page after alert
        window.location.href = 'home.html'; // Adjust to your home page URL
    } else {
        alert('Please select a payment method.');
    }
}

// Function to show/hide payment details based on selected method
let togglePaymentDetails = () => {
    let selectedPayment = document.querySelector('input[name="payment_method"]:checked').value;
    
    document.querySelectorAll('.payment_details').forEach(section => section.style.display = 'none');
    
    if (selectedPayment === 'credit_card') {
        document.getElementById('credit_card_details').style.display = 'block';
    } else if (selectedPayment === 'debit_card') {
        document.getElementById('debit_card_details').style.display = 'block';
    } else if (selectedPayment === 'upi') {
        document.getElementById('upi_details').style.display = 'block';
    }
}

// Event listeners
document.getElementById('confirm_payment').addEventListener('click', handleConfirmPayment);
document.querySelectorAll('input[name="payment_method"]').forEach(input => {
    input.addEventListener('change', togglePaymentDetails);
});

// Display order summary on page load
displayOrderSummary();
// Initially toggle payment details based on default selection
togglePaymentDetails();
