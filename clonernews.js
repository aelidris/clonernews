const sourceLink = "https://hacker-news.firebaseio.com/v0/";
let topStories = [];
let jobStories = []; // You will need this to fetch job stories

// Fetch the top stories (IDs only) when the page loads
fetch(sourceLink + 'topstories.json')
    .then(response => response.json())
    .then(data => {
        topStories = data.slice(0, 10); // Load only the first 10 stories for now
        displayTopStories(topStories);  // Call to display the stories
    })
    .catch((error) => console.log('Error fetching the top stories: ', error));

// Fetch the job stories (IDs only) when the page loads
fetch(sourceLink + 'jobstories.json')
    .then(response => response.json())
    .then(data => {
        jobStories = data.slice(0, 10); // Load only the first 10 job stories for now
        displayJobStories(jobStories); // Call to display job stories
    })
    .catch((error) => console.log('Error fetching the job stories: ', error));

// Function to fetch a story by ID (for top stories)
async function fetchTopStory(storyId) {
    const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
    const response = await fetch(storyUrl);
    const storyData = await response.json();
    return storyData;
}

// Function to display the top stories
async function displayTopStories(storyIds) {
    const storyContainer = document.getElementById('storyContainer');
    storyContainer.innerHTML = ''; // Clear any existing content

    for (let id of storyIds) {
        const story = await fetchTopStory(id);
        if (story) {
            const storyDiv = document.createElement('div');
            storyDiv.classList.add('story');
            storyDiv.innerHTML = `
                <h3>${story.title}</h3>
                <p><strong>By:</strong> ${story.by} | <strong>Score:</strong> ${story.score}</p>
                <p>${story.text ? story.text : ''}</p>
                <p>${story.url ? `<a href="${story.url}" target="_blank">Read more</a>` : ''}</p>
            `;
            storyContainer.appendChild(storyDiv);
        }
    }
}

// Function to fetch a job story by ID
async function fetchJobStory(jobId) {
    const jobUrl = `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`;
    const response = await fetch(jobUrl);
    const jobData = await response.json();
    return jobData;
}

// Function to display job stories
async function displayJobStories(jobIds) {
    const jobContainer = document.getElementById('jobContainer');
    jobContainer.innerHTML = ''; // Clear any existing content

    for (let id of jobIds) {
        const job = await fetchJobStory(id);
        if (job) {
            const jobDiv = document.createElement('div');
            jobDiv.classList.add('job');
            jobDiv.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>By:</strong> ${job.by} | <strong>Score:</strong> ${job.score}</p>
                <p>${job.text ?  '<b>The job description: </b>'+job.text : ''}</p>
                <p>${job.url ? `<a href="${job.url}" target="_blank">Read more</a>` : ''}</p>
            `;
            jobContainer.appendChild(jobDiv);
        }
    }
}