import { CardTravel } from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import './Checkout.css'
import TotalPrice from './TotalPrice/TotalPrice'
import ShoeItem from './ShoeItem/ShoeItem'
import firebaseService from '../../backend/firebaseService'

const Checkout = () => {    
    const [{cart, promotions}, dispatch] = useStateValue();
    const [promo, setPromo] = useState({naziv : ''});
    const [multiplePromos, setMultiplePromos] = useState(null)

    useEffect(() => {
        setMultiplePromos((multiplePromos) => multiplePromos = promotions.map((promos, idx) => (
            <div style={{cursor:'pointer', marginLeft: '50%'}} class='addedItems' onClick={() => deletePromo(promos)} key={idx}>{promos}<span>&#10006;</span></div>
        )))
    }, [promo])

    const handleChange = (e) => {
        const value = e.target.value;
        setPromo({...promo, naziv : value});
    };

    const handleCartPaymentCheckout = () => {
      dispatch({type:'EMPTY_CART'}); 
    }

    const usePromo = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_PROMOTIONS',
            item : promo,
        });

        setPromo({...promo, naziv: ''})
    }

    const deletePromo = (promos) => {
        dispatch({
            type: 'REMOVE_PROMOTION',
            item: promos,
        })
        setPromo({...promo, naziv:''});
    }


    return (
        <div className="checkout">
            .
            <div className="checkout__top">
                {cart?.length === 0 ?(
                    <div className="checkout__empty">
                        <span className="checkout__empty1">Vasa kosarica je prazna</span>
                        <span className="checkout__empty2">Nemate artikala u kosarici. Da biste kupili kliknit <strong>'Dodaj u kosaricu'</strong> pored artikla.</span>
                    </div>
                ): (
                    <div className="checkout__notEmpty">
                        <form class="form-inline" style={{position:'relative'}}>
                            <label id="icon" for="name" class="myCustomIcon" style={{position:'relative', top: '45px', left:'355px'}}>
                                <i className="fa fa-percent"></i>
                            </label>
                            <input type="text" name="name" id="name" placeholder="Unesi promo code ovdje" value={promo.naziv} required="" onChange={handleChange}></input>
                            <button style={{backgroundColor:'green'}} onClick={usePromo}className="buttonItem">Dodaj</button>
                             {
                                multiplePromos
                            }
                        </form>
                        <span>Vasa kosarica</span>
                        {
                            cart?.map(item => (
                                <ShoeItem
                                    id={item.id}
                                    image={item.image}
                                    title = {item.title}
                                    before= {item.before}
                                    after= {item.after}
                                    category= {item.category}
                                    quantity = {item.quantity}
                                    />
                            ))}
                    </div>
                )}
            </div>
            {cart?.length > 0 && (
                <div className="checkout__bottom">
                    <TotalPrice/>
                </div>
            )}
        </div>
    );
}

export default Checkout
