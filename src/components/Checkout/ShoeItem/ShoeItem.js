import React from 'react'
import './ShoeItem.css'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { useStateValue } from '../../StateProvider/StateProvider';
import firebaseService from '../../../backend/firebaseService';

const ShoeItem = ({id, image, title, before, after, category, quantity}) => {
    const [{cart, user}, dispatch] = useStateValue();

    function reduceCartItems(){
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        });
    }

    const removeFromCart = () => {
        user ? firebaseService.removeProductById(id, user)
            .then(reduceCartItems()) :
        reduceCartItems();
    }

    async function incrementCartQuantity(){
        const price = after / quantity;
        const product = {
        id : id,
        after : price,
        quantity: 1,
        }
        user ? firebaseService.putItemInCartByUser(product, user)
            .then(dispatch({type: "ADD_TO_CART", item : product})) :
        dispatch({type: "ADD_TO_CART", item : product})
        return
    }

    async function decreaseCartQuantity(){
       const price = after / quantity * -1
        const product = {
            id: id,
            after : price,
            quantity : -1,
        }
        console.log(`bitan price ti je sada ${price}, a after ${after-(2*price)}`);
        if(quantity - 1 <= 0){
            console.log("rjesavas condition");
            user ? firebaseService.removeProductById(id, user)
                .then(reduceCartItems()) : 
            reduceCartItems();
            return
        }
        if(user){
        firebaseService.putItemInCartByUser(product, user);
        }
        dispatch({
            type: "DECREASE_QUANTITY",
            id: id,
            after : price,
            quantity : 1,
        })

    }

    return (
        <div className="shoeItem">
            <img src={image} alt="shoe"/>
            <div className="shoeItem__right">
                <span className="shoeItem__title">{title}</span>
                <span className="shoeItem__category">{category}</span>
                <span className="shoeItem__price">Price: <span className="shoeItem_afterPrice">€{after}</span></span>
                <span className="shoeItem__price">Kolicina: <span className="shoeItem_afterPrice">{quantity}</span></span>
                <div class="input-Custom plus-minus-input">
                <div class="input-group-button">
                    <button type="button" style={{color:'red'}} onClick={decreaseCartQuantity}class="myCustomButton1 centerButtonIcons hollow circle" data-quantity="minus" data-field="quantity">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="input-group-button">
                    <button type="button" style={{color: 'green'}} onClick={incrementCartQuantity}class="myCustomButton1 centerButtonIcons hollow circle" data-quantity="plus" data-field="quantity">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                </div>
                </div>
                <div className="shoeItem__remove" onClick={removeFromCart}>
                    <span className="shoeItem__click">Ukloni iz kosarice</span>
                    <ShoppingCartRoundedIcon/>
                </div>
            </div>
        </div>
    )
}

export default ShoeItem
