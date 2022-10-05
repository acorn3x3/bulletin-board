/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPost, getPosts, uploadImage } from './fetch-utils.js';
import { renderPost } from './render-utils.js';
// > Part A: import upload image
// > Part B: import fetch to create a pet

/* Get DOM Elements */
const postForm = document.getElementById('post-form');
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

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `posts/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
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
