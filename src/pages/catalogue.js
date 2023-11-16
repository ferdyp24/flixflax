import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

// import actions definitions
import {
  insertCatalogue,
  addToCart,
} from '../actions'

const Catalogue = () => {
  // get the movies list & loading status from redux state
  const movies = useSelector(state => state.catalogue.movies);
  const isLoading = useSelector(state => state.catalogue.isLoading);
  const dispatch = useDispatch();

  // call the SWAPI after the component has been mounted
  useEffect(() => {
    (async () => {
      // since the amount of movies returned from SWAPI is always the same,
      // and sometimes the time required for SWAPI to returned the response is long,
      // it is a good decision to not keep requesting for the movies list each time we
      // re-render or revisiting the catalogue page. Just need to request on the first time we open the page.
      // Hence why we need to check if the movies array from the state is empty or not.
      if(movies.length === 0) {
        const res = await axios.get('https://swapi.dev/api/films');
        const newList = res.data.results.map(movie => ({
            id: movie.episode_id,
            title: movie.title,
            shortDesc: movie.opening_crawl,
            releaseDate: movie.release_date,
            director: movie.director,
            producer: movie.producer,
            price: 5000,
            poster: 'https://m.media-amazon.com/images/I/81RZipc6yOL._AC_SL1500_.jpg'
          })
        )
        dispatch(insertCatalogue(newList));
      }
    })()
  }, [dispatch, movies.length]);

  // Add to cart button handler
  const addToCartHandler = (index) => {
    dispatch(addToCart(movies[index]));
  };

  const loadingMarkup = (
    <div className="mt-4 text-center">
      <div className="spinner-border me-3" role="status" />Loading Movies....
    </div>
  );

  return (
    isLoading ? loadingMarkup : (
      <div className="container">
        <h2 className="mt-4 pb-2 border-bottom">Movies for Rent...</h2>
        <div className="row">
          {movies.map((movie, index) => (
            <div className="col-4 my-4" key={movie.id}>
              <div className="card" style={{width: "423px"}}>
                <img src={movie.poster} className="card-img-top" width={423} height={642} alt="poster" />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">Rp{movie.price}</h6>
                  <p className="card-text" style={{display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", overflow: "hidden"}}>{movie.shortDesc}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => addToCartHandler(index)}
                  >
                    Add to cart
                  </button>
                  <Link to={`/detail/${index}`} className="btn btn-outline-secondary">View Detail</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
};

export default Catalogue;
