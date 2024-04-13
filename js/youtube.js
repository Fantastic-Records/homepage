import { apiKey, channelId } from './config.js';

const manualVideoIds = [
  'xlXq37Sp5po',
  '9_-_PgOlNik',
  '52ji1QIdC7c',
  'PdV2oulQnx4',
  'Ry8i6wix0sQ',
  'O6w56SbPDCo',
  'OSTc5UuAdUs',
  'qPmRhcwoe-U',
];

function displayThumbnails() {
  const thumbnailContainer = document.getElementById('thumbnail-container');

  const videoIds = manualVideoIds;

  videoIds.forEach(videoId => {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    const thumbnailElement = document.createElement('img');
    thumbnailElement.src = thumbnailUrl;
    thumbnailElement.alt = `Thumbnail for video ${videoId}`;
    thumbnailElement.className = 'thumbnail';

    thumbnailElement.addEventListener('click', () => {
      openModal(videoId);
    });

    thumbnailContainer.appendChild(thumbnailElement);
  });

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=date&type=video&key=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`YouTube API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.items || data.items.length === 0) {
        throw new Error('No videos found for the specified channel.');
      }

      const channelVideoIds = data.items.map(item => item.id.videoId);

      channelVideoIds.forEach(videoId => {
        if (!manualVideoIds.includes(videoId)) {
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

          const thumbnailElement = document.createElement('img');
          thumbnailElement.src = thumbnailUrl;
          thumbnailElement.alt = `Thumbnail for video ${videoId}`;
          thumbnailElement.className = 'thumbnail';

          thumbnailElement.addEventListener('click', () => {
            openModal(videoId);
          });

          thumbnailContainer.appendChild(thumbnailElement);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching video information:', error.message);
    });
}

function openModal(videoId) {
  const videoContainerBackground = document.getElementById('video-container-background');
  const videoContainer = document.getElementById('video-container');
  const videoPlayer = document.getElementById('video-player');

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  videoPlayer.src = embedUrl;
  videoContainerBackground.style.display = 'flex';

  videoContainerBackground.addEventListener('click', () => {
    videoContainerBackground.style.display = 'none';
    videoPlayer.src = '';
  });
}

window.addEventListener('load', () => {
  displayThumbnails();
});