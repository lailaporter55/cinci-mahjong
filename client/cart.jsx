//anything that the user adds to cart will be stored here
//also will be stored in mongoDB 
//bookings and tiles can be added to cart

const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const checkout = async () => {
    const orderData = {
        items: cart, 
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    const data = await res.json();
    alert(`Order successful! Your order ID is ${data.orderId}`);
    setCart([]);
};

const App = async (props) => {
    const [checkout] = useState(false);

    if(props.isLoggedIn){
        return (
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart.length === 0 && <p>Your cart is empty</p>}
                {cart.map(item => (<p key={item.id}>{item.name} x {item.quantity} </p>))}
                {cart.length > 0 && (<button className="checkoutButton" onClick={checkout}>Checkout</button>)}
            </div>
    
        );
    }


};
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};
window.onload = init;