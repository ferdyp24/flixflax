import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Cart from '../../pages/cart';
import { removeOneItem, resetCart } from '../../actions/index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

describe('Cart component', () => {
  const mockStore = configureStore();
  let store;

  it('render empty cart', () => {
    store = mockStore({
      cart: {
        items: [],
        totalPrice: 0
      }
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Delete /i })).not.toBeInTheDocument();
  });

  it('renders cart data, remove one item, and reset cart', () => {
    store = mockStore({
      cart: {
        items: [
          {
            id: 1,
            title: 'Test Movie',
            shortDesc: 'Test Description',
            director: 'Test Director',
            producer: 'Test Producer',
            releaseDate: '2023-01-01',
            price: 6000,
            poster: 'test.jpg',
          },
          {
            id: 2,
            title: 'Test Movie 2',
            shortDesc: 'Test Description 2',
            director: 'Test Director 2',
            producer: 'Test Producer 2',
            releaseDate: '2023-01-02',
            price: 5000,
            poster: 'test.jpg',
          },
        ],
        totalPrice: 11000
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('Rp11000')).toBeInTheDocument();

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Rp6000')).toBeInTheDocument();
    expect(screen.getByText('Rp5000')).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: 'Delete' }).length).toBe(2);
    expect(screen.getByRole('button', { name: /Remove All/i })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(mockDispatch).toHaveBeenCalledWith(removeOneItem(0));

    jest.clearAllMocks();

    fireEvent.click(screen.getByRole('button', { name: 'Remove All' }));
    expect(mockDispatch).toHaveBeenCalledWith(resetCart());
  });
});
