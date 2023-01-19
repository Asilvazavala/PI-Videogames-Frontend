import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getGenres, getPlatforms, updateGame } from '../actions';
import '../styles/CreateGame.css';

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is necesary';
  } else if (!input.description) {
      errors.description = 'Description must be completed'
    } else if (!input.rating || input.rating > 5 || input.rating < 1) {
        errors.rating = 'Rating must have a value between 1-5'
      } else if (!input.genres) {
          errors.genres = 'Select at least one Genre'
        } else if (!input.platforms) {
            errors.platforms = 'Select at least one Platform'
          }
  return errors;
};

export const CreateGame = (props) => {

  //Traer el estado del reducer 
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);

  const dispatch = useDispatch();
  const history = useHistory();
 
  const [errors, setErrors] = useState({});
  const [showButton, setShowButton] = useState();
  const [input, setInput] = useState({
    name: '',
    description: '',
    releaseDate: '',
    rating: '',
    genres: [],
    platforms: [],
  })

  // Ejecuto la action getGenres de ./Actions
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch]);

  // Ejecuto la action getPlatforms de ./Actions
  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch]);


  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.value] : e.target.value
    }));
    console.log(input);
  };

  const handleSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    })
  };

  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })
  };

  const handleDeleteGenres = (el) => {
    setInput({
      ...input,
      genres: input.genres.filter(genre => genre !== el)
    })
  };

  const handleDeletePlatforms = (el) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(platform => platform !== el)
    })
  };

  const handleCheck = (e) => {
    if (e.target.value === 'update' & e.target.checked && e.target.value === 'create' & e.target.checked) {
      alert('Select only one action Update/Create')
    } else if(e.target.value === 'update' && e.target.checked) {
        setShowButton('update');
      } else if(e.target.value === 'create' && e.target.checked) {
          setShowButton('create');
        }
  };

  const handleSubmitCreate = (e) => {
    if (!input.name || !input.description || !input.rating || !input.genres.length || !input.platforms.length) {
      alert('Complete all * fields please');
    } else if(input.rating > 5 || input.rating < 1) {
        alert('Rating must have a value between 1-5');
      } else if(!input.image) {
          input.image = 'https://acortar.link/2vXTcJ';
        } else if(!input.releaseDate) {
            input.releaseDate = 'Coming soon...';
          } else {
            dispatch(postGame(input));
            alert('Game created sucessfully!!')
            setInput({
              name: '',
              description: '',
              releaseDate: '',
              rating: '',
              genres: [],
              platforms: [],
            })
            history.push('/home');
          }
  }; 

  const handleSubmitUpdate = (e) => {
    if (!input.name || !input.description || !input.rating || !input.genres.length || !input.platforms.length) {
      alert('Complete all * fields please');
    } else if(input.rating > 5 || input.rating < 1) {
        alert('Rating must have a value between 1-5');
      } else if(!input.image) {
          input.image = 'https://acortar.link/2vXTcJ';
        } else if(!input.releaseDate) {
            input.releaseDate = 'Coming soon...';
          } else {
            dispatch(updateGame(props.match.params.id, input));
            alert('Game modified sucessfully!!')
            setInput({
              name: '',
              description: '',
              releaseDate: '',
              rating: '',
              genres: [],
              platforms: [],
            })
            history.push('/home');
          }
  };


  return (
    <div className='container-createGame'>
      <h1>Create your own game!</h1>
      <p className='h4-required'>Required fields (*)</p>
      <form className='form-container'>
        <div className='form-container'>
          <label>*Name:</label>
          <input
            type='text'
            value={input.name}
            name='name'
            onChange={(e) => handleChange(e)}
            className='form-input'
          ></input>
          {errors.name && (
            <p className='error error-name'>{errors.name}</p>
          )}
        </div>
        
        <div className='form-container'> 
          <label>*Description:</label>
          <textarea
            type='text'
            value={input.description}
            name='description'
            className='form-input-description'
            onChange={(e) => handleChange(e)}
          ></textarea>
          {errors.description && (
            <p className='error'>{errors.description}</p>
          )}
        </div>

        <div className='form-container'>
          <label>Release Date:</label>
          <input
            type='date'
            value={input.releaseDate}
            name='releaseDate'
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className='form-container'>
          <label>*Rating:</label>
          <input
            type='number'
            value={input.rating}
            name='rating'
            className='form-input-rating'
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.rating && (
            <p className='error'>{errors.rating}</p>
          )}
        </div>

        <div className='form-container'>
          <label>Image:</label>
          <input
            type='text'
            value={input.image}
            name='image'
            className='form-input'
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.image && (
            <p className='error'>{errors.image}</p>
          )}
        </div>

        <div className='form-container'>
          <label>*Genre(s):
          <select 
            name='genres' 
            onChange={(e) => handleSelectGenres(e)}>
          <option></option>
            {allGenres.map((genre) => {
              return (
                <option>{genre.name}</option>
              )
            })}
          </select>
          </label>
          <br></br>

          {input.genres.map(el => 
      <ul className='active-genres-platforms' key={el}>
        <li>
          <p className=''>{el}</p>
          <button 
            className='botonX'
            onClick={() => handleDeleteGenres(el)}>x
          </button>
        </li>
      </ul>
      )}
        </div>
        <br></br>
        <br></br>
        
 
        <div className='form-platform'>
          <label>*Platform(s):
          <select 
            name='platforms' 
            onChange={(e) => handleSelectPlatforms(e)}>
          <option></option>
            {allPlatforms.map((platform) => {
              return (
                <option value={platform} >{platform} </option>
              )
            })}
          </select>
          </label>
          <br></br>

          {input.platforms.map(el => 
      <ul className='active-genres-platforms' key={el}>
        <li>
          <p>{el}</p>
          <button 
            className='botonX'
            onClick={() => handleDeletePlatforms(el)}>x
          </button>
        </li>
      </ul>
      )}
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div className='form-update form-container'>
          <label><input
            type='checkbox'
            value='update'
            name='update'
            onChange={(e) => handleCheck(e)}
          />Update</label>

          <label><input
            type='checkbox'
            value='create'
            name='create'
            onChange={(e) => handleCheck(e)}
          />Create</label>
        </div>

      </form>
      <Link to = '/home'><button className='boton-volver'>Return</button></Link>
      
      <button 
        onClick={handleSubmitUpdate}
        className = {showButton === 'update' && props.match.params.id ? 'boton-update' : 'hide'}
        >Update
      </button>

      <button 
        onClick={handleSubmitCreate}
        className = {showButton === 'create' && !props.match.params.id ? 'boton-crear' : 'hide'}
        >Create
      </button>

    </div>
  )
}
