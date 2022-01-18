import React from 'react'
import './TotalPrice.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider/StateProvider'
import {getCartTotal, getRightDiscount} from '../../StateProvider/reducer'
import StripeCheckout from 'react-stripe-checkout';

const TotalPrice = () => {
    const [{cart, promotions, numOfItems}, dispatch] = useStateValue();

    const handleToken = (token, addresses) => {
        console.log({token, addresses});
        alert("Greska u prepoznavanju tokena.")
    }

    return (
        <div className="totalPrice">
            <CurrencyFormat

                renderText={(value) => (
                    <>
                        <span className="totalPrice__items">Broj artikala u kosarici: <strong>{numOfItems}</strong></span>
                        <span className="totalPrice__total">Ukupna cijena artikala: <strong>{`${value}`}</strong></span>
                    </>
                )}

                decimalScale={2}
                value = {getRightDiscount(cart,promotions)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"€"}
                />

                <div className="totalPrice__button">
                    
                </div>
        </div>
    )
}

export default TotalPrice
