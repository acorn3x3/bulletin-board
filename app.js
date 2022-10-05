/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';
// > Part A: import upload image
// > Part B: import fetch to create a pet

/* Get DOM Elements */
const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = postForm.querySelector('button');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/pet-photo-placeholder.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `posts/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);
    // > Part A: Call upload image with the bucket ("images"),
    // the imagePath, and the imageFile - and store the returned url

    const post = {
        title: formData.get('title'),
        content: formData.get('content'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;
    addButton.disabled = false;

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
