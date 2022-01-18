import React from 'react';
import { Link } from 'react-router-dom';

import './Slides.css';
import AirJordan from './airJordan.jpg';
import NikeBlazers from './nikeBlazers.jpg';
import AirMax from './airMax.jpg';

import LoyaltyIcon from '@material-ui/icons/Loyalty';

const Slides = ({ image, alternate, shoes, off, pathTo }) => {

  return (
    <>
    <div className="slides__clearance">
      <span className="slides__clearanceSale">Eccomerce app</span>
      <LoyaltyIcon className="slides__icon" />
    </div>
    <div className="slides">
      <img className="slides__img" src={image} alt={alternate} />
      <div className="slides__right">
        <span className="slides__tag">Na popustu <span className="slides__shoes">{shoes}</span> za <span className="slides__sale">prodaju</span></span>
        <div className="slides__saleDiv">
          <span className="slides__upto">Do</span>
          <span className="slides__off">{off}% <span className="slides__upto">popusta</span></span>
        </div>
        <Link to={pathTo}>
          <button className="slides__button">Istrazi jos</button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default Slides;