// 手動で指定した動画IDのリスト
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

  // APIから取得した動画IDと手動で指定した動画IDのリストを組み合わせて重複を削除する
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

window.addEventListener('load', () => {
  displayThumbnails();
});