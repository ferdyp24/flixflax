import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import App from '../App';

jest.mock('../components/navigation-bar', () => () => <div>NavBar</div>)
jest.mock('../pages/catalogue', () => () => <div>Catalogue</div>)
jest.mock('../pages/detail', () => () => <div>Detail</div>)
jest.mock('../pages/cart', () => () => <div>Cart</div>)

describe('App Component', () => {
  test('renders NavBar and default route', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
    expect(screen.queryByText('Detail')).not.toBeInTheDocument();
    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
  });

  test('renders /catalogue route', () => {
    render(
      <MemoryRouter initialEntries={['/catalogue']}>
        <App />
      </MemoryRouter>
    );
  
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
    expect(screen.queryByText('Detail')).not.toBeInTheDocument();
    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
  });

  test('renders /cart route', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
  
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.queryByText('Detail')).not.toBeInTheDocument();
    expect(screen.queryByText('Catalogue')).not.toBeInTheDocument();
  });

  test('renders /detail route', () => {
    let testLocation;
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <App />
        <Route
        path="*"
        render={({ history, location }) => {
          testLocation = location;
          return null;
        }}
      />
      </MemoryRouter>
    );
  
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('Detail')).toBeInTheDocument();
    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
    expect(screen.queryByText('Catalogue')).not.toBeInTheDocument();
    expect(testLocation.pathname).toBe('/detail/1');
  });
});
