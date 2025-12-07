const helper = require('./helper.js');
const React = require('react'); 
const { useState, useEffect } = React; 
const { createRoot } = require('react-dom/client'); 

useEffect(() => {
    fetch('/backend/db.json')
    .then((res) => res.json())
    .then(data => createOrder(data));
}, []);

const addToCart = (tile) => {
    const exists = cart.find(item => item.id === tile.id);
    if(exists){
        setCart(
            cart.map(item =>
                item.id === tile.id ? { ...item, quantity: item.quantity + 1} : item
            )
        );
    }else{
        setCart([...cart, { ...tile, quantity: 1 }]);
    }
};

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
return (
    <div className="tilePage">
        <h1>Tiles</h1>
        <div className="tileList">
            {tiles.map((tile) => (
                <div key={tile.id} className="tileItem">
                    <img src={tile.image} alt={tile.name} />
                    <h3>{tile.name}</h3>
                    <p>Price: ${tile.price}</p>
                    <button onClick={() => addToCart(tile)}>Add to Cart</button>
                </div>
            ))}
        </div>
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 && <p>Your cart is empty</p>}
            {cart.map(item => (<p key={item.id}>{item.name} x {item.quantity} </p>))}
            {cart.length > 0 && (<button className="checkoutButton" onClick={checkout}>Checkout</button>)}
        </div>
    </div>
);


