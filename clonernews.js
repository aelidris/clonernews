document.addEventListener("DOMContentLoaded", function() {
    // Default view on page load
    loadTopStories();

    // Handle clicks on navigation buttons
    document.querySelector('#top-stories-btn').addEventListener('click', loadTopStories);
    document.querySelector('#new-stories-btn').addEventListener('click', loadNewStories);

    // Event delegation for handling clicks on story titles
    document.querySelector('#stories-list').addEventListener('click', function(e) {
        if (e.target && e.target.matches('li.story-item')) {
            const storyId = e.target.dataset.id;
            loadStoryDetails(storyId);
        }
    });
});

function loadTopStories() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => response.json())
        .then(storyIds => {
            displayStories(storyIds.slice(0, 10));  // Limiting to 10 for now
        });
}

function displayStories(storyIds) {
    const storiesList = document.querySelector('#stories-list');
    storiesList.innerHTML = ''; // Clear existing stories

    storyIds.forEach(id => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => response.json())
            .then(story => {
                const storyItem = document.createElement('li');
                storyItem.classList.add('story-item');
                storyItem.dataset.id = story.id;
                storyItem.innerHTML = `<strong>${story.title}</strong> - by ${story.by}`;
                storiesList.appendChild(storyItem);
            });
    });
}
function loadStoryDetails(storyId) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        .then(response => response.json())
        .then(story => {
            const storyDetails = document.querySelector('#story-details');
            storyDetails.innerHTML = `
                <h2>${story.title}</h2>
                <p>By: ${story.by}</p>
                <p>${story.text ? story.text : 'No content available'}</p>
                <p>Score: ${story.score}</p>
            `;

            // Optionally load comments
            if (story.kids) {
                loadComments(story.kids);
            }
        });
}

function loadComments(commentIds) {
    const commentsSection = document.querySelector('#comments');
    commentsSection.innerHTML = ''; // Clear existing comments

    commentIds.slice(0, 5).forEach(commentId => {  // Limit to 5 comments
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            .then(response => response.json())
            .then(comment => {
                const commentItem = document.createElement('div');
                commentItem.innerHTML = `
                    <p><strong>${comment.by}</strong>: ${comment.text}</p>
                `;
                commentsSection.appendChild(commentItem);
            });
    });
}
