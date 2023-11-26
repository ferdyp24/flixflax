import reducer, { initialState } from '../../reducers/catalogueReducer';

const mockPayload = [
  {
    id: 4,
    title: 'A New Hope',
    shortDesc: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
    releaseDate: '1977-05-25',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    price: 5000,
    poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
  },
  {
    id: 5,
    title: 'The Empire Strikes Back',
    shortDesc: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
    releaseDate: '1980-05-17',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    price: 5000,
    poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
  }
]

test('should return initial state', () => {
  expect(reducer(initialState, {})).toEqual(initialState);
});

test('should insert catalogue data', () => {
  expect(reducer(initialState, {
    type: 'INSERT_CATALOGUE',
    payload: mockPayload
  })).toEqual({
    movies: mockPayload,
    isLoading: false,
  });
});
