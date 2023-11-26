import reducer, { initialState } from '../../reducers/cartReducer';

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

const mockPayloadNotEmpty = {
  id: 5,
  title: 'The Empire Strikes Back',
  shortDesc: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
  releaseDate: '1980-05-17',
  director: 'Irvin Kershner',
  producer: 'Gary Kurtz, Rick McCallum',
  price: 5000,
  poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
}

test('should return initial state', () => {
  expect(reducer(initialState, {})).toEqual(initialState);
});

test('should be able to add item on empty cart', () => {
  expect(reducer(initialState, {
    type: 'ADD_TO_CART',
    payload: mockPayload
  })).toEqual({
    items: [mockPayload],
    totalPrice: 5000
  });
});

test('should be able to add item on existing cart', () => {
  expect(reducer({
    items: [mockPayload],
    totalPrice: 5000
  }, {
    type: 'ADD_TO_CART',
    payload: mockPayloadNotEmpty
  })).toEqual({
    items: [mockPayload, mockPayloadNotEmpty],
    totalPrice: 10000
  });
});

test('should handle to not add duplicate item', () => {
  expect(reducer({
    items: [mockPayload],
    totalPrice: 5000
  }, {
    type: 'ADD_TO_CART',
    payload: mockPayload
  })).toEqual({
    items: [mockPayload],
    totalPrice: 5000
  });
});

test('should handle remove one item resulting empty cart', () => {
  expect(reducer({
    items: [mockPayload],
    totalPrice: 5000
  }, {
    type: 'REMOVE_ONE_ITEM',
    payload: 0
  })).toEqual(initialState);
});

test('should handle remove one item', () => {
  expect(reducer({
    items: [mockPayload, mockPayloadNotEmpty],
    totalPrice: 10000
  }, {
    type: 'REMOVE_ONE_ITEM',
    payload: 0
  })).toEqual({
    items: [mockPayloadNotEmpty],
    totalPrice: 5000
  });
});

test('should handle reset cart', () => {
  expect(reducer({
    items: [mockPayload, mockPayloadNotEmpty],
    totalPrice: 10000
  }, { type: 'RESET_CART' })).toEqual(initialState);
});
