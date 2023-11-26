import * as actions from '../../actions/index'

const mockPayload = {
  id: 4,
  title: 'A New Hope',
  shortDesc: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
  releaseDate: '1977-05-25',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  price: 5000,
  poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
}

test('add to cart action', () => {
  expect(actions.addToCart(mockPayload)).toEqual({
    type: 'ADD_TO_CART',
    payload: mockPayload,
  });
});

test('remove one item from cart action', () => {
  expect(actions.removeOneItem(0)).toEqual({
    type: 'REMOVE_ONE_ITEM',
    payload: 0,
  });
});

test('reset cart action', () => {
  expect(actions.resetCart()).toEqual({
    type: 'RESET_CART'
  });
});

test('insert catalogue action', () => {
  expect(actions.insertCatalogue(mockPayload)).toEqual({
    type: 'INSERT_CATALOGUE',
    payload: mockPayload,
  });
});
