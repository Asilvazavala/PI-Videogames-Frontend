import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

export const Card = ({ name, image, genres, platforms, rating, id}) => {
  return (
    <div className='Card-container'>
      <Link to = {'/videogame/' + id}>
        <img src={image} alt='Img not found' width='280px' height='180px'/>
      </Link>
      <h3 className='name'>{name}</h3>
      <span className='genre'>{'*' + genres}</span>
      <h5 className='platform'>{'*' + platforms}</h5>
      <span className='rating'>{rating}</span>
    </div>
  );
}
