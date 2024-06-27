document.addEventListener('DOMContentLoaded', function() {
    loadPosts();

    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const postText = document.getElementById('postText').value;
        createPost(postText);
    });
});

function loadPosts() {
    fetch('posts.php')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';
            data.forEach(post => {
                createPostElement(post);
            });
        });
}

function createPost(texto) {
    fetch('posts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=create&texto=${encodeURIComponent(texto)}`
    })
    .then(() => {
        loadPosts();
        document.getElementById('postText').value = '';
    });
}

function toggleLikePost(id) {
    fetch('posts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=like&id=${id}`
    })
    .then(() => {
        loadPosts();
    });
}

function deletePost(id) {
    fetch('posts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=delete&id=${id}`
    })
    .then(() => {
        loadPosts();
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'card mt-3 card-twitter';
    postDiv.innerHTML = `
        <div class="card-body">
            <p class="card-text">${post.texto}</p>
            <button class="btn btn-outline-success me-2 like-btn ${post.curtida ? 'liked btn-success' : 'btn-outline-success'}" onclick="toggleLikePost(${post.id})">${post.curtida ? 'Curtido' : 'Curtir'}</button>
            <button class="btn btn-outline-danger delete-btn" onclick="deletePost(${post.id})">Excluir</button>
        </div>
    `;
    document.getElementById('postsContainer').appendChild(postDiv);
}
