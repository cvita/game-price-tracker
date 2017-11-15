import youTube from '../youTube';
const fetchMock = require('fetch-mock');
const fs = require('fs');


it('should take a string and return a valid YouTube video id', () => {
  fetchMock.get(
    'begin:https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=',
    fs.readFileSync('./src/client/__tests__/__mockData__/youTubeVideoSearch.json', 'utf8')
  );
  expect.assertions(2);
  return youTube.searchVideo('last of us remastered ign review')
    .then(resp => {
      expect(resp).toBeDefined();
      expect(resp).toEqual('a4Pz9O2Pts0');
      fetchMock.restore();
    });
});

it('should reject with an error message if YouTube has no results', () => {
  const bogusSearch = 'izhrjfdngaeiyj94rkgfbzawierkslgdbcPwegklmsd,IRGKdfmbhsdfh';
  return youTube.searchVideo(bogusSearch).catch(e => {
    expect(e).toBeDefined();
  });
});
