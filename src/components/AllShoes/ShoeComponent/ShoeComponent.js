import React from 'react';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import './ShoeComponent.css';
import { useStateValue } from '../../StateProvider/StateProvider';
import firebaseService from '../../../backend/firebaseService';

const ShoeComponent = ({ link, id, title, before, after, category }) => {

  console.log('rendera se shoe component');
  const [{ cart, user }, dispatch] = useStateValue();

  const product = {
    id: id,
    image: link,
    title : title,
    before: before,
    after: after,
    quantity: 1,
    
  }

  function IncrementCartItems (){
    console.log("inkrementiras number");
    dispatch({
      type: 'ADD_TO_CART',
      item : product,
    })
  }
  
  const addToCart = () => {
    console.log(`user kod umetanja je ${user}`);
    user ? firebaseService.putItemInCartByUser(product, user)
      .then(IncrementCartItems()) :
    IncrementCartItems();
  };

  return (
    <div className="shoeComponent">
      <img src={link} alt="Nike Metcon 6" />
      <div className="shoeComponent__name1 shoeComponent__name2 shoeComponent__name3">
        <span>{title}</span>
      </div>
      <div className="shoeComponent__price">
        <span className="shoeComponent__before">Prije: <span className="shoeComponent__beforePrice">€{before}</span></span>
        <span className="shoeComponent__after">Poslije: <span className="shoeComponent__afterPrice">€{after}</span></span>
      </div>
      <div className="shoeComponent__add" onClick={addToCart} >
        <div className="oneMore">
          <span>Dodaj u kosaricu</span>
          <ShoppingCartRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default ShoeComponent;