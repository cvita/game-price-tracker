function searchVideo(keywords) {
  return new Promise((resolve, reject) => {
    console.log('ABOUT TO SEARCH YOUTUBE for', keywords);
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${keywords}&regionCode=US&type=video&videoCategoryId=20&videoEmbedable=true`;
    const key = '&key=AIzaSyAxXnGEhkkZmEh7zfugJpAsJ7kpSU4GbDc';
    const request = apiUrl + key;
    fetch(request, { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => {
        resolve(resp.items[0].id.videoId);
      })
      .catch(err => reject(err.message));
  });
}


export default {
  searchVideo
};