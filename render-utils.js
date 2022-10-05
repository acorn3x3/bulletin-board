export function renderPost(post) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = post.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.content;

    li.append(img, h2, p);

    return li;
}
