function processSingleResultGameInfo(game) {
  return new Promise(resolve => {
    const info = parseBasicGameInfo(game);

    info.details = {
      description: game.long_desc.slice(0, game.long_desc.indexOf('<br>')),
      genre: null,
      releaseDate: game.release_date,
      gameDev: game.provider_name,
      platforms: game.playable_platform,
      starRating: parseFloat(game.star_rating.score),
      esrbRating: game.content_rating.url
    };

    try {
      info.media = {
        screenshots: game.mediaList.screenshots.slice(0, 3).map(pic => pic.url),
        videos: game.promomedia.slice(0, 2).map(video => video.url)
      };
    } catch (e) {
      info.media = { screenshots: [], videos: [] };
    }

    resolve(info);
  });
}

function processMultipleResultGameInfo(results, maxResults) {
  return new Promise(resolve => {
    const validResults = [];

    if (results.hasOwnProperty('links') && Array.isArray(results.links)) {
      const idValidation = /UP\d{4}-\w{9}_00-\w{16}/g;

      for (let i = 0; i < results.links.length; i++) {
        let game = results.links[i];
        try {
          if (!idValidation.test(game.id)) {
            continue;
          }
          if (validResults.length >= maxResults) {
            break;
          }
          validResults.push(parseBasicGameInfo(game, 225));
        } catch (e) {
          continue;
        }
      }
    }

    resolve(validResults);
  });
}

function parseBasicGameInfo(game, imageSize = 400) {
  const normalPrice = game.default_sku.display_price !== 'Free' ?
    parseFloat(game.default_sku.display_price.slice(1)) :
    parseFloat('0.00').toFixed(2);

  const info = {
    _id: game.id,
    title: game.name,
    url: `https://store.playstation.com/#!/en-us/games/cid=${game.id}`,
    price: normalPrice,
    strikePrice: null,
    onSale: game.default_sku.rewards.length > 0,
    discount: null,
    psPlusPrice: null,
    lastUpdated: new Date(new Date().toDateString()).getTime(),
    image: `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${game.id}/image?w=${imageSize}&h=${imageSize}`,
    details: { platforms: game.playable_platform }
  };

  if (info.onSale) {
    let saleInfo = game.default_sku.rewards[0];
    if (!saleInfo.isPlus) {
      info.price = saleInfo.display_price !== 'Free' ? parseFloat(saleInfo.display_price.slice(1)) : parseFloat('0.00').toFixed(2);
      info.strikePrice = normalPrice;
    } else {
      info.psPlusPrice = saleInfo.display_price !== 'Free' ? parseFloat(saleInfo.display_price.slice(1)) : parseFloat('0.00').toFixed(2);
    }
    info.discount = parseInt(saleInfo.discount, 10);
  }

  return info;
}


export default {
  processSingleResultGameInfo,
  processMultipleResultGameInfo
};
