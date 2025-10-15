const Explore = require('../assets/lottie/explore.json');
const Save = require('../assets/lottie/save.json');
const Feed = require('../assets/lottie/feed.json');
const upload = require('../assets/lottie/uploading.json');

export const slides = [
  {
    key: 'explore',
    title: 'Explore Wallpapers',
    description: 'Discover curated collections updated daily for every mood and style.',
    animation: Explore,
  },
  {
    key: 'favorites',
    title: 'Save Favorites',
    description: 'Bookmark the wallpapers you love and find them instantly.',
    animation: Save,
  },
  {
    key: 'upload',
    title: 'Upload Your Art',
    description: 'Share your creations with the community and build your profile.',
    animation: upload,
  },
  {
    key: 'customize',
    title: 'Customize Your Feed',
    description: 'Follow categories and artists to tailor Aesthetica to you.',
    animation: Feed,
  },
];