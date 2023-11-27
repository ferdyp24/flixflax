import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Detail from '../../pages/detail';
import { addToCart } from '../../actions/index';

// mock dispatch so we can test if the button handlers work
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

// mock the useParam hook from router to return the item's id
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 0 })
}));

describe('Detail component', () => {
  // initiating mock redux store
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    // defining the mock store
    store = mockStore({
      catalogue: {
        movies: [
          {
            id: 1,
            title: 'Test Movie',
            shortDesc: 'Test Description',
            director: 'Test Director',
            producer: 'Test Producer',
            releaseDate: '2023-01-01',
            price: 5000,
            poster: 'test.jpg',
          },
        ],
      },
    });
  });

  it('renders movie details and handles "Add to cart" button click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>
    );

    // check the item's data is rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Director:')).toBeInTheDocument();
    expect(screen.getByText('Test Director')).toBeInTheDocument();
    expect(screen.getByText('Producer:')).toBeInTheDocument();
    expect(screen.getByText('Test Producer')).toBeInTheDocument();
    expect(screen.getByText('Release Date:')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Price:')).toBeInTheDocument();
    expect(screen.getByText('Rp5000')).toBeInTheDocument();

    // check the add to cart functionality
    fireEvent.click(screen.getByText('Add to cart'));
    expect(mockDispatch).toHaveBeenCalledWith(addToCart({
      id: 1,
      title: 'Test Movie',
      shortDesc: 'Test Description',
      director: 'Test Director',
      producer: 'Test Producer',
      releaseDate: '2023-01-01',
      price: 5000,
      poster: 'test.jpg',
    }));
  });
});
