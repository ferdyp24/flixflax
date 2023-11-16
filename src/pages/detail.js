import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// import actions definitions
import { addToCart } from '../actions'

const Detail = () => {
  // get the movie index from the URL
  const { id } = useParams();
  const dispatch = useDispatch();
  // get the movie detail data with the index
  const movieData = useSelector(state => state.catalogue.movies[id]);

  // Add to cart button handler
  const addToCartHandler = () => {
    dispatch(addToCart(movieData));
  };

  return (
    <div className="container">
      <h2 className="mt-4 pb-2 border-bottom">Detail...</h2>
      <div className="card mt-4 me-auto">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={movieData.poster} className="img-fluid rounded-start" alt="poster" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{movieData.title}</h5>
              <p className="card-text border-bottom pb-3">{movieData.shortDesc}</p>
              <p className="card-text">Director: <small className="text-body-secondary">{movieData.director}</small></p>
              <p className="card-text">Producer: <small className="text-body-secondary">{movieData.producer}</small></p>
              <p className="card-text">Release Date: <small className="text-body-secondary">{movieData.releaseDate}</small></p>
              <p className="card-text">Price: <strong>Rp{movieData.price}</strong></p>
              <button onClick={addToCartHandler} className="btn btn-primary me-2">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Detail;
