export function renderPost(post) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = post.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.content;

    const contactEl = document.createElement('p');
    contactEl.textContent = post.contact;

    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(post.category);
    p.append(span);

    li.append(img, h2, p, contactEl);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'nature') return '🌲';
    if (category === 'neighborhood') return '🏡';
    if (category === 'shopping') return '🏪';
    if (category === 'dining') return '🥗';
    return '❓';
}
