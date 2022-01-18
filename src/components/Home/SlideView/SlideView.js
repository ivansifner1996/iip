import React, { Component, useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlideView.css';
import Slider from 'react-slick';
import Slides from './Slides/Slides';
import firebaseService from '../../../backend/firebaseService';

const SlideView = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
        fetchRecord()
    }, []);

    const fetchRecord = async() => {
      const numberOfItems = 5
      const specialProducts = await firebaseService.getSpecificNumOfItems();
      var limitedProducts = specialProducts.sort(function(a,b){
        return (parseInt(b.discount) - parseInt(a.discount))
      }).slice(0,numberOfItems);
      setProducts(...products, limitedProducts);
    }
    return (
      <div className="slideView__wrapper">
        <Slider className="slideView__slider"
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          infinite={true}
          dots={true}
        >
        {products &&
        products.map((product, index) => (
        <div className="slideView__page">
          <Slides
            key = {index} 
            image={product.link}
            alternate={product.title}
            shoes={product.title}
            off={product.discount}
            pathTo={product.pathTo}
          />
        </div>
        ))}
        </Slider>
        .
      </div>
    );
}

export default SlideView;