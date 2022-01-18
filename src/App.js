import React, {useEffect, useMemo} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useStateValue } from './components/StateProvider/StateProvider';
import {auth} from './firebase'
import firebaseService from './backend/firebaseService';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Men from './components/AllShoes/Men/Men';
import Women from './components/AllShoes/Women/Women';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login'
import Promo from './components/Promo/Promo';
import Dashboard from './components/Dashboard/Dashboard';

import MenCategories from './components/AllShoes/Men/MenCategories/MenCategories';
import WomenCategories from './components/AllShoes/Women/WomenCategories/WomenCategories';
import AddProduct from './components/Dashboard/AddProduct';
import ProductList from './components/Dashboard/ProductList';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  const [{user, cart}, dispatch] = useStateValue();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        sessionStorage.setItem("isAuthenticated", JSON.stringify(authUser));
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
        getItemsByUser(authUser);
      }else{
        sessionStorage.removeItem("isAuthenticated");
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

     console.log("app");
    const getItemsByUser = async (user) => {
        const items = await firebaseService.getUserProducts(user);
        if(items){
            dispatch({
            type: 'ADD_TO_CART_MANY',
            item: items,
            })
    }
    }

    return () => {
      unsubscribe();
    }

  }, [])  

  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route path="/category/men/:type">
            <MenCategories />
          </Route>
          <Route path="/men">
            <Men />
          </Route>
        <Route path="/category/women/:type">
            <WomenCategories />
          </Route>
          <Route path="/women">
            <Women />
          </Route>
          
          <ProtectedRoute path="/dashboard" component={Dashboard}/>
          
          <Route path="/promocode">
          <Promo/>
          </Route>

          <Route exact path="/products">
            <Dashboard/>
            <ProductList/>
          </Route>
            <Route exact path="/add">
              <Dashboard/>
              <AddProduct/>
            </Route>

          <Route path="/login">
            {/* <Header /> */}
            <Login />
          </Route>
          
          <Route path="/checkout">
            <Checkout/>
          </Route>

          <Route path="/" >
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;