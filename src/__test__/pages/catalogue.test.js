import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import axios from 'axios';

import Catalogue from '../../pages/catalogue';
import { insertCatalogue, addToCart } from '../../actions/index';

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

const mockDispatch = jest.fn();
jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

describe('Catalogue component', () => {
  afterEach(() => jest.clearAllMocks());

  const mockStore = configureStore();
  let store;

  it('render loading catalogue', async () => {
    store = mockStore({
      catalogue: {
        movies: [],
        isLoading: true,
      }
    });

    const history = createMemoryHistory();
    history.push = jest.fn();

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

    expect(screen.getByText('Loading Movies....')).toBeInTheDocument();
    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/films');
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(insertCatalogue(mockMovies)));
  });

  it('render movies list, handle add to cart button, and go to detail', () => {
    store = mockStore({
      catalogue: {
        movies: mockMovies,
        isLoading: false,
      }
    });

    const history = createMemoryHistory();
    history.push = jest.fn();

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

    expect(screen.queryByText('Loading Movies....')).not.toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockMovies[0]));

    fireEvent.click(screen.getAllByRole('link', { name: 'View Detail' })[0]);
    expect(history.push).toHaveBeenCalledWith('/detail/0');
  });
});
