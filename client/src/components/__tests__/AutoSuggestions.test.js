import React from 'react';
import AutoSuggestions from '../AutoSuggestions';
import renderer from 'react-test-renderer';


const stubData = [{
  _id: 'UP9000-CUSA00553_00-THELASTOFUS00000',
  title: 'The Last of Us: Left Behind Stand Alone',
  url: 'https://store.playstation.com/#!/en-us/games/cid=UP9000-CUSA00553_00-THELASTOFUS00000',
  price: '9.99',
  strikePrice: null,
  onSale: false,
  discount: null,
  psPlusPrice: null,
  lastUpdated: 1501570800000,
  image: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP9000-CUSA00553_00-THELASTOFUS00000/image?w=225&h=225',
  details: {
    platforms: ['PS4™']
  }
}];

it('renders correctly', () => {
  const tree = renderer.create(
    <AutoSuggestions autoSuggestions={stubData} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
