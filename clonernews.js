const sourceLink = "https://hacker-news.firebaseio.com/v0/";
let story, jobs, polls, comments;

fetch(sourceLink + 'item/8863.json?print=pretty')
  .then(response => response.json())
  .then(data => {
    story = data;
    console.log(story);  // Move console.log inside the .then block
  })
  .catch((error) => console.log('Error to fetch the data: ', error));

  fetch(sourceLink + 'item/192327.json?print=pretty')
  .then(response => response.json())
  .then(data => {
    jobs = data;
    console.log(jobs);  // Move console.log inside the .then block
  })
  .catch((error) => console.log('Error to fetch the data: ', error));

  fetch(sourceLink + 'item/126809.json?print=pretty')
  .then(response => response.json())
  .then(data => {
    polls = data;
    console.log(polls);  // Move console.log inside the .then block
  })
  .catch((error) => console.log('Error to fetch the data: ', error));

  fetch(sourceLink + 'item/2921983.json?print=pretty')
  .then(response => response.json())
  .then(data => {
    comments = data;
    console.log(comments);  // Move console.log inside the .then block
  })
  .catch((error) => console.log('Error to fetch the data: ', error));

  const postsContainer = document.getElementById('posts');
// Example function to render a single post
function renderPost(postData) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const title = document.createElement('div');
    title.classList.add('post-title');
    title.textContent = postData.title;

    const author = document.createElement('div');
    author.classList.add('post-author');
    author.textContent = `By: ${postData.by}, Type: ${postData.type}`;

    postElement.appendChild(title);
    postElement.appendChild(author);

    // Add a button to load comments later
    const showCommentsButton = document.createElement('button');
    showCommentsButton.textContent = 'Show Comments';
    showCommentsButton.onclick = () => loadComments(postData.id, postElement);
    postElement.appendChild(showCommentsButton);

    postsContainer.appendChild(postElement);
}

// Fetch posts from Hacker News API (just an example with a specific ID)
function fetchPost(postId) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`)
        .then(response => response.json())
        .then(postData => renderPost(postData))
        .catch(error => console.error('Error fetching post:', error));
}

// Fetch a few posts for demonstration
fetchPost(8863);  // Sample post ID (Dropbox story)
fetchPost(2921983);  // Another post

