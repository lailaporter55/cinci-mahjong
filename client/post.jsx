/* similar to domomaker maker.jsx
* users can post photos and reviews of their mahjong parties
* will show up after the user logs into the party page
*/

//user can see posts without logging in

const helper = require('./helper.js');
const React = require('react'); 
const { useState, useEffect } = React; 
const { createRoot } = require('react-dom/client'); 
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

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

//https://www.youtube.com/watch?v=XeiOnkEI7XI used this video to help with the photo input 
//https://www.youtube.com/watch?v=BmhU_MoxNqQ used this video help with the star rating
//user can upload a review, rate with stars, and upload a photo
const PostForm = (props) => {
    const [rating , setRating ] = useState(null);
    const state = {selectedFile: null};
    const fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }
    const fileUploadHandler =  (e) => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('/reviews', fd).then(res => {
                console.log(res);
            });
            setSelectedFile(null); 
    }
    return (
        <form id="postForm"
            onSubmit={(e) => handlePost(e, props.triggerReload)}
            name="postForm"
            action= "/reviews"
            method= "POST"
            className="postForm"
        >
            
            {[...Array(5)].map(star , index =>{
                const currentRate = index + 1;
                return (
                    <>
                    <label>
                    <input type="radio" name="rate" value={currentRate} onClick={() => setRating(currentRate)}/>
                    <FaStar size={25}
                    color={currentRate <= (hover || rating) ? "pink" : "grey"}
                    />
                    </label>
                    </>
            
                )
            })}
            <label htmlFor="review">Tell us what you think:</label>
            <input id="review" type="text" name="review" placeholder="Tell us what you think" />
            <input type="file" onChange={this.fileSelectedHandler} name="photo"/>
            <button onClick={this.fileUploadHandler}>Upload</button>
            <label htmlFor="photo">Upload a Photo:</label>
            <input id="submitPost" type="submit" value="Post Review" />

        </form>
    );
};

//list of reviews 
const PostList = (props) => {
    const [posts, setPosts] = useState(props.posts); 

    useEffect(() => {
        const loadPostsFromServer = async() => {
            const response = await fetch('/getPosts');
            const data = await response.json(); 
            setPosts(data.posts);
        };
        loadPostsFromServer();
    }, [props.reloadPosts]);

    if(posts.length === 0){
        return (
            <div className="postList">
                <h3 className="emptyPost">No Posts Yet!</h3>
            </div>
        );
    }
    const postNodes = posts.map(post => {
        return(
            <div key={post.id} className="post">
                <img src="/assets/img/2tigersLogo.PNG" alt="2 Tigers Logo" class="tigersLogo2"/>
                <h3 className="starNum">Stars: </h3>
                <h3 className="review">Review: </h3>
                <h3 className="photo">Photo: </h3>
            </div>
        );
    });
    return (
        <div className="postList">
            {postNodes}
        </div>
    )
}

const App = async (props) => {
    const [reloadPosts, setReloadPosts] = useState(false); 

    if(props.isLoggedIn){
        <div id="makePost">
                <PostForm triggerReload={() => setReloadPosts(!reloadPosts)} />
        </div>
    }

    return (
        <div>
            <div id="postList">
                <PostList posts={[]} reloadPosts={reloadPosts} />
            </div>
        </div>
    );
};
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App /> );
};
window.onload = init;