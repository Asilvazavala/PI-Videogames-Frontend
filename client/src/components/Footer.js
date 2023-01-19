import React from 'react';
import Linkedin from '../images/linkedin.svg';
import Github from '../images/github.svg';

export const Footer = () => {
  return (
    <div className='container-footer'>
    
      <a href='https://github.com/Asilvazavala' target='blank' rel='noreferrer'> 
        <img
          className='img-github'
          alt='Not found'
          src={Github}
          width= '30px'
          height='30px'
        />
      </a>
      
      <a href='https://www.linkedin.com/in/antonio-silva-developer/' target='blank' rel='noreferrer'> 
        <img
          className='img-linkedin'
          alt='Not found'
          src={Linkedin}
          width= '30px'
          height='30px'
        />
      </a>

      <h4 className='h4-myname'>Antonio Silva</h4>
      <h4>2023 - GameFinder | All rights reserved</h4>

    </div>
  )
}
