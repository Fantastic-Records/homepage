const manualVideoIds = [
  'xrFtHYujyKw',
  'ZjzQLNQrI7o',
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

  const allVideoIds = [...new Set([...manualVideoIds])]; 

  allVideoIds.forEach(videoId => {
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
}

function openModal(videoId) {
  const videoContainerBackground = document.getElementById('video-container-background');
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