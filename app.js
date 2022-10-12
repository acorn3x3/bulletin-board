/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPosts } from './fetch-utils.js';
import { renderPost } from './render-utils.js';
// > Part A: import upload image
// > Part B: import fetch to create a pet

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postList = document.getElementById('post-list');
/* State */
let error = null;
let posts = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getPosts();
    error = response.error;
    posts = response.data;

    if (error) {
        displayError();
    } else {
        displayPosts();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPosts() {
    postList.innerHTML = '';

    for (const post of posts) {
        const postEl = renderPost(post);
        postList.append(postEl);
    }
}
