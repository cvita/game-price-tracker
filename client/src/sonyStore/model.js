function processSingleResultGameInfo(game) {
  return new Promise(resolve => {
    const info = parseBasicGameInfo(game);

    info.details = {
      description: game.long_desc,
      releaseDate: game.release_date,
      gameDev: game.provider_name,
      platforms: game.playable_platform,
      starRating: parseFloat(game.star_rating.score),
      esrbRating: game.content_rating.url
    };

    try {
      info.screenshots = game.mediaList.screenshots.slice(0, 3).map(pic => pic.url);
    } catch (e) {
      info.screenshots = [];
    }

    resolve(info);
  });
}

function processMultipleResultGameInfo(results, maxResults) {
  return new Promise(resolve => {
    const validatedResults = [];

    if (results.hasOwnProperty('links') && Array.isArray(results.links)) {
      const games = results.links;

      for (let i = 0; i < games.length; i++) {
        if (validatedResults.length >= maxResults) {
          break;
        }
        try {
          if (!validateGameId(games[i].id)) {
            continue;
          }
          validatedResults.push(parseBasicGameInfo(games[i]));
        } catch (e) {
          continue;
        }
      }
    }

    resolve(validatedResults);
  });
}

function parseBasicGameInfo(game) {
  const pricing = game.default_sku;
  const normalPrice = pricing.display_price !== 'Free' ? parseFloat(pricing.display_price.slice(1)) : '0.00';
  const onSale = pricing.rewards.length > 0 && pricing.rewards[0].reward_source_type_id === 2;

  const info = {
    _id: game.id,
    title: game.name,
    url: `https://store.playstation.com/#!/en-us/games/cid=${game.id}`,
    price: normalPrice,
    strikePrice: null,
    onSale: onSale,
    discount: null,
    psPlusPrice: null,
    lastUpdated: new Date(new Date().toDateString()).getTime(),
    image: `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${game.id}/image?w=225&h=225`,
    details: { platforms: game.playable_platform }
  };

  if (onSale) {
    const saleInfo = pricing.rewards[0];
    if (!saleInfo.isPlus) {
      info.price = saleInfo.display_price !== 'Free' ? parseFloat(saleInfo.display_price.slice(1)) : '0.00';
      info.strikePrice = normalPrice;
    } else {
      info.psPlusPrice = saleInfo.display_price !== 'Free' ? parseFloat(saleInfo.display_price.slice(1)) : '0.00';
    }
    info.discount = parseInt(saleInfo.discount, 10);
  }

  return info;
}

function validateGameId(gameId) {
  const idValidation = /UP\d{4}-\w{9}_00-\w{16}/g;
  return idValidation.test(gameId.toString());
}

function normalizeTitle(title) {
  return title
    .replace(/[.,#!$%^&*;:{}=\-_'"`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
}


export default {
  processSingleResultGameInfo,
  processMultipleResultGameInfo,
  validateGameId,
  normalizeTitle
};
