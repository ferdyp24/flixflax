import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import axios from 'axios';

import Catalogue from '../../pages/catalogue';
import { insertCatalogue, addToCart } from '../../actions/index';

// mock data
const mockSWAPI = [
  {
    episode_id: 1,
    title: 'Test Movie',
    opening_crawl: 'Test Description',
    director: 'Test Director',
    producer: 'Test Producer',
    release_date: '2023-01-01',
    url: 'https://swapi.dev/api/films/1/'
  },
  {
    episode_id: 2,
    title: 'Test Movie 2',
    opening_crawl: 'Test Description 2',
    director: 'Test Director 2',
    producer: 'Test Producer 2',
    release_date: '2023-01-02',
    url: 'https://swapi.dev/api/films/2/'
  },
];

const mockMovies = [
  {
    id: 1,
    title: 'Test Movie',
    shortDesc: 'Test Description',
    releaseDate: '2023-01-01',
    director: 'Test Director',
    producer: 'Test Producer',
    price: 5000,
    poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
  },
  {
    id: 2,
    title: 'Test Movie 2',
    shortDesc: 'Test Description 2',
    releaseDate: '2023-01-02',
    director: 'Test Director 2',
    producer: 'Test Producer 2',
    price: 5000,
    poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
  },
]

// mock dispatch so we can test if the button handlers work and axios to customize the response
const mockDispatch = jest.fn();
jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

describe('Catalogue component', () => {
  afterEach(() => jest.clearAllMocks());

  // initiating mock redux store
  const mockStore = configureStore();
  let store;

  it('render loading catalogue', async () => {
    // defining the mock store to have empty cart item
    store = mockStore({
      catalogue: {
        movies: [],
        isLoading: true,
      }
    });

    // create a mock history object
    const history = createMemoryHistory();
    // create mock to test if the Link component redirects to '/cart'
    history.push = jest.fn();

    // mock axios response
    axios.get.mockResolvedValue({ data: {
      results: mockSWAPI
    }});

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalogue />
        </Router>
      </Provider>
    );

    // check if the loading text is being rendered
    expect(screen.getByText('Loading Movies....')).toBeInTheDocument();
    // check that there should be no item being rendered (a movie title)
    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();

    // check axios and redux dispatch in useEffect
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/films');
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(insertCatalogue(mockMovies)));
  });

  it('render movies list, handle add to cart button, and go to detail', () => {
    // defining the mock store to have two cart items
    store = mockStore({
      catalogue: {
        movies: mockMovies,
        isLoading: false,
      }
    });

    // create a mock history object
    const history = createMemoryHistory();
    // create mock to test if the Link component redirects to '/cart'
    history.push = jest.fn();

    // mock axios response
    axios.get.mockResolvedValue({ data: {
      results: mockSWAPI
    }});

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalogue />
        </Router>
      </Provider>
    );

    // check that it should not show the loading text
    expect(screen.queryByText('Loading Movies....')).not.toBeInTheDocument();
    // check that axios and redux dispatch is not called in useEffect
    expect(axios.get).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    // check if the items/movies from the mock store are rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();

    // test the add to cart functionality
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockMovies[0]));

    // test go to detail page
    fireEvent.click(screen.getAllByRole('link', { name: 'View Detail' })[0]);
    expect(history.push).toHaveBeenCalledWith('/detail/0');
  });
});
