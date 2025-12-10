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


const App = async (props) => {
    const [addToCart] = useState(false); 
    if(props.isLoggedIn){
        <div id="addToCart">
            <button onClick={() => addToCart(tile)}>Add to Cart</button>
        </div>
    }

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
        </div>
    );
    
};
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App /> );
};
window.onload = init;