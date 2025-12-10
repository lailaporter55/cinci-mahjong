const helper = require('./helper.js'); 
const React = require('react'); 
const {createRoot} = require('react-dom/client'); 

//super basic react file so that webpack doesnt give me issues

const Home = () => {
    <div>Home Page</div>
}

const init = () => {
    const root = createRoot(document.getElementById('home')); 
    root.render(<Home />);
}

window.onload = init;