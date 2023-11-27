import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import NavigationBar from '../../components/navigation-bar';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';

describe('NavBar', () => {
  it('renders correctly with mocked Redux state', () => {
    // Mock the initial Redux state
    const initialState = {
      cart: {
        items: [
          {
            id: 4,
            title: 'A New Hope',
            shortDesc: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
            releaseDate: '1977-05-25',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            price: 5000,
            poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
          }
        ],
      },
    };

    // Create a mocked Redux store
    const store = configureMockStore()(initialState);

    // create a mock history object
    const history = createMemoryHistory();
    // create mock to test if the Link component redirects to '/cart'
    history.push = jest.fn();

    // Render the component with the mocked store and Router
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavigationBar />
        </Router>
      </Provider>
    );

    // check if the menu items are being rendered
    expect(screen.getByText('Flix Flax')).toBeInTheDocument();
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText(`${initialState.cart.items.length}`)).toBeInTheDocument();

    // test the Link component functionality using one of the menu
    fireEvent.click(screen.getByText('Cart'))
    expect(history.push).toHaveBeenCalledWith('/cart');
  });
});
