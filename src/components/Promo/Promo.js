import React from 'react'
import './Promo.css';

const Promo = () => {
    return (
        <div class="flexItemsResponse">
        <div class="coupon">
            <div class="container">
                <h3>PROMO 20%</h3>
            </div>
            <img src="https://5.imimg.com/data5/OS/YR/MY-31092406/smoke-detector-500x500.jpg" alt="Avatar" style={{width:'100%'}}/>
            <div class="container" style={{backgroundColor:'white'}}>
                <h2><b>20% OFF YOUR PURCHASE</b></h2> 
                <p>Ovaj kod daje vam 20% popusta, ali se on ne može koristiti u kombinaciji sa ostalim promo kodovima.</p>
            </div>
            <div class="container">
                <p>Koristi promo code: <span class="promo">20%OFF</span></p>
                <p class="expire">Istjece : 20.06.2021</p>
            </div>
        </div>
        <div class="coupon">
            <div class="container">
                <h3>PROMO 5%</h3>
            </div>
            <img src="https://chacon.com/10164-large_default/addition-wireless-camera.jpg" alt="Avatar" style={{width:'100%'}}/>
            <div class="container" style={{backgroundColor:'white'}}>
                <h2><b>5% OFF YOUR PURCHASE</b></h2> 
                <p>Ovaj kod daje vam 5% popusta, te se on može koristiti u kombinaciji sa ostalim promo kodovima.</p>
            </div>
            <div class="container">
                <p>Koristi promo code: <span class="promo">5%OFF</span></p>
                <p class="expire">Istjece : 07.03.2021</p>
            </div>
        </div>
        <div class="coupon">
            <div class="container">
                <h3>PROMO 20 EURO</h3>
            </div>
            <img src="https://cdn.webshopapp.com/shops/189995/files/228726296/900x900x2/v-tac-pir-motion-sensor-with-twilight-switch-360-r.jpg" alt="Avatar" style={{width:'100%'}}/>
            <div class="container" style={{backgroundColor:'white'}}>
                <h2><b>20EURO % OFF YOUR PURCHASE</b></h2> 
                <p>Ovaj kod daje vam 20 EURA popusta, te se on može koristiti u kombinaciji sa ostalim promo kodovima.</p>
            </div>
            <div class="container">
                <p>Koristi promo code: <span class="promo">20EUROFF</span></p>
                <p class="expire">Istjece : 12.11.2021</p>
            </div>
        </div>
        </div>
    )
}

export default Promo
