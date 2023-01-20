import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail, deleteGame, getGames } from '../actions';
import '../styles/GameDetail.css';

export const GameDetail = (props) => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  let gameDetail = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getGameDetail(props.match.params.id));
  },[dispatch]);
 
  useEffect(() => {
    dispatch(getGames());
  },[dispatch])

  
  const handleDelete = () => {
    dispatch(deleteGame(props.match.params.id));
    alert('Game deleted sucessfully!!');
    dispatch(getGames());
    gameDetail = [];
    history.push('/home');
  };
 
  return (
    <div className='container-GameDetail'>
      {
        gameDetail.length > 0 ?
        <div className='card-detail'>
          <img 
            src = {gameDetail[0].img ? gameDetail[0].img : gameDetail[0].image} 
            alt = 'Not found'
            width = '400px'
            height = '250px' />
          <h1>{gameDetail[0].name}</h1>
          <p>Description: {gameDetail[0].createdInDB ? gameDetail[0].description : gameDetail[0].description.map(el => el + (', '))}</p>
          <h3>Release Date: {gameDetail[0].releaseDate}</h3>
          <p>Genre(s): {!gameDetail[0].createdInDB ? gameDetail[0].genres + ' ' : gameDetail[0].genres.map(el => el.name + (', '))}</p>
          <h3>Platform(s): {gameDetail[0].platforms.map(el => el + (', '))}</h3>
          <p>Rating: {gameDetail[0].rating}</p>
        </div> : <span class="loader"></span>
      }
      
      <Link to = '/home'>
        <button 
        className='buttons-game-detail button-return-detail'
        onClick={gameDetail}>Return</button>
      </Link>
      
        <button 
          className={props.match.params.id.length > 8 ? 'buttons-game-detail button-delete-detail' : 'hide-btn'}
          onClick={handleDelete}
          >Delete
        </button>

      <Link to = {'/newGame/' + props.match.params.id}>
        <button 
          className={props.match.params.id.length > 8 ? 'buttons-game-detail button-update-detail' : 'hide-btn'}
        >Update
        </button>
      </Link>
    </div>
  )
}
