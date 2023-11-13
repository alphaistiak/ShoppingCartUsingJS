const cartItems = [];

    function addToCart(productId) {
        const product = document.querySelector(`.product[data-id="${productId}"]`);
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        if (!cartItems.some(item => item.id === productId)) {
            cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            updateCart();
        }
    }

    function removeFromCart(productId) {
        const index = cartItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            cartItems.splice(index, 1);
            updateCart();
        }
    }

    function updateCart() {
        const cartContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cartContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }