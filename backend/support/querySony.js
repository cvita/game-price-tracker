import rp from 'request-promise';


// Store URL follows this pattern: `https://store.playstation.com/#!/en-us/games/cid=${id}`
// Image URL follows this pattern `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${id}/image?w=225&h=225`

const fetchGame = id => (
    new Promise((resolve, reject) => {
        if (!validateId(id)) {
            reject(new Error('Invalid game ID'));
            return;
        }
        const options = {
            uri: `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${id}`,
            headers: { 'User-Agent': 'Request-Promise' },
            json: true
        };
        rp(options)
            .then(res => resolve(parseGameInfo(res)))
            .catch(e => reject(e));
    })
);

const parseGameInfo = game => {
    const { id, name, playable_platform, star_rating, content_rating, release_date, provider_name, long_desc, mediaList } = game;
    const { display_price, rewards } = game.default_sku;
    const onSale = rewards.length > 0 && rewards[0].reward_source_type_id === 2;
    const regularPrice = normalizePrice(display_price);

    const screenshotsAvailable = mediaList && mediaList.screenshots && Array.isArray(mediaList.screenshots);
    const screenshots = screenshotsAvailable ? mediaList.screenshots.slice(0, 3).map(screenshot => screenshot.url) : [];

    const info = {
        game_id: id,
        title: name,
        sale_general: onSale,
        sale_ps_plus: false, // *
        discount_general: 0, // *
        discount_ps_plus: 0, // *
        price_general: regularPrice, // *
        price_ps_plus: regularPrice, // * These default values update via `determineSaleDetails()`
        price_regular: regularPrice,
        release_date: release_date,
        star_rating: parseFloat(star_rating.score),
        esrb_rating: content_rating.description,
        developer: provider_name,
        platforms: playable_platform,
        screenshots,
        description: long_desc
    };

    if (onSale) {
        return determineSaleDetails(rewards[0], info);
    }
    return info;
};

const determineSaleDetails = (reward, info) => {
    const { discount, display_price, isPlus } = reward; // Note this is a different `display_price` then from above
    if (isPlus) { // PS Plus sale, only
        info.sale_ps_plus = true;
        info.price_ps_plus = normalizePrice(display_price);
    } else if (reward.hasOwnProperty('bonus_discount')) { // General sale, with additional PS Plus sale
        const { bonus_discount, bonus_display_price } = reward;
        info.sale_ps_plus = true;
        info.discount_general = parseInt(discount, 10);
        info.discount_ps_plus = parseInt(bonus_discount, 10);
        info.price_general = normalizePrice(display_price);
        info.price_ps_plus = normalizePrice(bonus_display_price);
    } else { // General sale, only
        info.discount_general = parseInt(discount, 10);
        info.price_general = normalizePrice(display_price);
        info.price_ps_plus = normalizePrice(display_price);
    }
    return info;
};

const validateId = id => /UP\d{4}-\w{9}_00-\w{16}/g.test(id);

const normalizePrice = priceString => (
    priceString.toLowerCase() === 'free' ? 0 : parseFloat(priceString.slice(1)) // Remove `$`
);


module.exports = {
    fetchGame
};
