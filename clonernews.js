// Constants
const ITEMS_PER_PAGE = 20;
const UPDATE_INTERVAL = 5000;
const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// State variables
let items = [];
let loading = false;
let page = 1;
let liveUpdates = [];

// DOM elements
const itemsContainer = document.getElementById('items-container');
const liveUpdatesContainer = document.getElementById('live-updates');
const loadingIndicator = document.getElementById('loading-indicator');

// Fetch items from the API
async function fetchItems(start, end) {
    const response = await fetch(`${API_BASE_URL}/newstories.json`);
    const storyIds = await response.json();
    const itemPromises = storyIds.slice(start, end).map(id =>
        fetch(`${API_BASE_URL}/item/${id}.json`).then(res => res.json())
    );
    return Promise.all(itemPromises);
}

// Load more items
async function loadMoreItems() {
    if (loading) return;
    loading = true;
    loadingIndicator.style.display = 'block';

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = page * ITEMS_PER_PAGE;
    const newItems = await fetchItems(start, end);
    
    items = [...items, ...newItems];
    renderItems(newItems);
    
    loading = false;
    loadingIndicator.style.display = 'none';
    page++;
}

// Render items to the DOM
function renderItems(newItems) {
    newItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h2>${item.title}</h2>
            <p>By ${item.by} | ${new Date(item.time * 1000).toLocaleString()}</p>
            ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">Read more</a>` : ''}
            ${item.text ? `<p>${item.text}</p>` : ''}
            ${item.kids ? `<p>${item.kids.length} comment${item.kids.length !== 1 ? 's' : ''}</p>` : ''}
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Fetch live updates
async function fetchLiveUpdates() {
    const response = await fetch(`${API_BASE_URL}/updates.json`);
    const updates = await response.json();
    liveUpdates = updates.items.slice(0, 5);
    renderLiveUpdates();
}

// Render live updates to the DOM
function renderLiveUpdates() {
    liveUpdatesContainer.innerHTML = liveUpdates.length > 0
        ? `<h3>Live Updates</h3><ul>${liveUpdates.map(id => `<li>New item: ${id}</li>`).join('')}</ul>`
        : '<p>No new updates</p>';
}

// Handle scroll event for infinite scrolling
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreItems();
    }
}

// Initialize the app
function init() {
    loadMoreItems();
    setInterval(fetchLiveUpdates, UPDATE_INTERVAL);
    window.addEventListener('scroll', handleScroll);
}

// Start the app
init();