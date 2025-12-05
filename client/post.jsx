/* similar to domomaker maker.jsx
* users can post photos and reviews of their mahjong parties
* will show up after the user logs into the party page
*/

//user can see posts without logging in

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
    );
};
//i need to figure out how i should add the photos in and the stars input will be different 

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
            <div id="domos">
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