/* similar to domomaker maker.jsx
* users can post photos and reviews of their mahjong parties
* will show up after the user logs into the party page
*/

const helper = require('./helper.js');
const React = require('react'); 
const { useState, useEffect } = React; 
const { createRoot } = require('react-dom/client'); 

//handles the review posting 
const handlePost = (e, onPostAdded) => {
    e.preventDefault(); 
    helper.hideError(); 

    const stars = e.target.querySelector('#starNum').value;
    const review = e.target.querySelector('#review').value; 
    const photo = e.target.querySelector('#photo').value; 

    if(!stars || !review){
        helper.handleError('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, {stars, review, photo}, onPostAdded);
    return false; 
}

const PostForm = (props) => {
    return (
        <form id="postForm"
            onSubmit={(e) => handlePost(e, props.triggerReload)}
            name="postForm"
            action= "/maker"
            mathod= "POST"
            className="postForm"
        >
            <label htmlFor="stars">Stars:</label>
            <input id="starNum" type="text" name="stars" placeholder="Stars (1-5)" />
            <label htmlFor="review">Tell us what you think:</label>
            <input id="review" type="text" name="review" placeholder="review" />

        </form>
    )
}

//i need to figure out how i should add the photos in and the stars input will be different 