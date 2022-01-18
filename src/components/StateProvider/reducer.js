export const initialState = {
  cart: [],
  promotions : [],
  user: null,
  searchTerm: '',
  numOfItems : 0,
  error : 0
};

export const getCartTotal = (cart) =>
cart?.reduce((amount, item) => item.after + amount, 0);


/*
const reducePrice = (product, quantity, itemPrice = 0) => {
    if(quantity > 0 && product){
        if(product.name === 'Nike Tiempo Legend 8'){
            if(quantity % 3 ==0){
                return Math.round((product.price - 15.00 - 0.02 + Number.EPSILON) * 100)/100;
            }

            return Math.round((product.price - 25.00 + 0.01) * 100)/100;
    }
        else if(product.name === 'New Adidas 2021'){
            if(quantity % 2 == 0){
                return Math.round((product.price - 15.00 - 0.01 + Number.EPSILON) * 100)/100;
            }
            return Math.round((product.price - 20.00 + 0.01)*100)/100;
        }
        else return Math.round((product.price - itemPrice) * 100)/100;
}
}
*/
export const getRightDiscount = (cart, promotions) => {
    let totalReturnedPrice = getCartTotal(cart);
    const newArray = promotions.reduce((acc,element) => {
        if(element === "20EUROFF"){
            return [element, ...acc]
        }
        return [...acc, element]
    }, []);
    var reducerPrice = 0;
        newArray.forEach(element => {
        switch(element){
        case "5%OFF":
            totalReturnedPrice -= totalReturnedPrice * (5 / 100);
            break;
        case "20EUROFF":
            totalReturnedPrice -= 20;
            break;
        case "20%OFF":
            let tempPrice = (totalReturnedPrice * 20) / 100;
            totalReturnedPrice = totalReturnedPrice - tempPrice;
            break;
        }
    });
    return totalReturnedPrice;
}

const checkCodeValidity = (naziv, stateCopy) => {
    if((naziv === "20%OFF" || stateCopy.includes("20%OFF")) && stateCopy.length > 0){
             console.warn(
                    `Ne mozete kombinirati promociju 20%OFF sa drugim promocijama`
                );       
            return 1;
        }
    else if(stateCopy.includes(naziv)){
            console.warn(`Vec ste iskoristili ovu promociju`);
            return 2;
                }
    else return 0;
}

const checkForQuantity = (product,price, quantity) => {
    var multiplier = 0;
    if(quantity % 3 == 0 && product.name === 'Nike Tiempo Legend 8'){
        multiplier = quantity / 3;
        return multiplier * 65.00
    }else if(quantity % 2 == 0 && product.name === 'New Adidas 2021'){
        multiplier = quantity / 2;
        return multiplier * 35.00;
    }else return Math.round((product.price + price) * 100)/100;
}


const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'ADD_TO_CART':
            let specificIndex = state.cart.findIndex((obj) => obj.id === action.item.id);
            let numItems = state.numOfItems + 1;
            var price;
            if(action.item.name === 'Nike Tiempo Legend 8' || action.item.name === "New Adidas 2021"){
                let product = state.cart.filter(item => item.name.includes(action.item.name));
                if(state.cart.length > 0 && state.cart[specificIndex]){
                let quantity = state.cart[specificIndex].quantity+1;
                price = checkForQuantity(product[0], action.item.after, quantity);
                }

            }else {
                if(state.cart[specificIndex]){
                price = action.item.after + state.cart[specificIndex].after;
                } else {price = action.item.after;}
            }
            if(state.cart?.length == 0 && state.numOfItems > 0){
                numItems = 1;
            }
            if(specificIndex >= 0){
                return {
                    ...state,
                    numOfItems:numItems,
                    cart: state.cart.map((item, idx) =>
                        idx === specificIndex
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            after : price,
                            unitPrice : action.item.after
                        }
                        :item
                    ),
                };
            }
            return{
                ...state,
                numOfItems: numItems,
                cart : [...state.cart, action.item]
            };  
    case 'ADD_TO_CART_MANY':
      var brojPrimjeraka = 0;
      action.item.forEach(item => {
          brojPrimjeraka+= item.quantity;
      })
      console.log(`broj primjeraka ti iznosi ${brojPrimjeraka}`);
      return {
        ...state,
        numOfItems : brojPrimjeraka,
        cart : [...state.cart, ...action.item]
      }
    case 'EMPTY_CART':
            return{
                ...state,
                cart : [],
                quantity : 0,
                numOfItems : 0
            }
    case 'REMOVE_FROM_CART':
            let newCart = [...state.cart];
            const index = state.cart.findIndex((cartItem) => cartItem.id === action.id);
            let removeQuantity = state.cart[index].quantity;
            let numItem = state.numOfItems - removeQuantity;
            if(index >= 0) {
                newCart.splice(index, 1);
            } 
            else {
                console.warn(
                `Ne mozes obrisati prozvod koji ima (id: ${action.id}) posto se ne nalazi u vasoj kosarici`
                );
            }
            return{
                ...state,
                numOfItems: numItem,
                cart : newCart,
            }
    case 'ADD_PROMOTIONS':
            const allowedPromotions = ["5%OFF", "20EUROFF", "20%OFF"];
            let stateCopy = [...state.promotions];
            console.log(`greska ti je aaaaaaaaaaaaaaaaaaaaaa ${state.error}`)
            let greska = checkCodeValidity(action.item.naziv, stateCopy);
            console.log(`lokalna greska ti je ${greska}`);
            if(allowedPromotions.includes(action.item.naziv)){
                if(greska === 0){
                return{
                        ...state,
                        promotions : [...state.promotions, action.item.naziv]
                    }
                }else{ 
                    switch(greska){
                        case 0: greska = ''; break;
                        case 1: greska =  `Ne mozete kombinirati promociju 20%OFF sa drugim promocijama`; break;
                        case 2: greska = `Vec ste iskoristili ovu promociju`; break;
                    }                    
                return {
                    ...state,
                    error : greska
                }
                
            }

            }else{
                return {
                    ...state,
                    error : 'Unijeli ste nepostojeci promo kod'
                }
            }
    case 'REMOVE_PROMOTION':
            let newPromotion = [...state.promotions]
            const indexPromotion = state.promotions.indexOf(action.item);
            if(indexPromotion >= 0) {
                newPromotion.splice(indexPromotion, 1);
            } 
            else {
                console.warn(
                `Ne mozes obrisati promociju koja ima naziv (${action.item.naziv}) posto je on vec specificiran`
                );
            }
            return{
                ...state,
                error : '',
                promotions : newPromotion,
            }
    case 'FILTER_BY_SEARCH':
      return {
        ...state,
        searchTerm : action.payload
      }
    case 'ADD_QUANTITY':
            console.log("napadas quantity");
            let specificIndexQ = state.cart.findIndex((obj) => obj.id === action.id);
            let addNumber = state.numOfItems + 1;
            if(specificIndexQ >= 0){
                return {
                    ...state,
                    numOfItems : addNumber,
                    cart: state.cart.map((item, idx) =>
                        idx === specificIndexQ
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        :item
                    ),
                };
            }
        case 'DECREASE_QUANTITY':
            let specificIndexD = state.cart.findIndex((obj) => obj.id === action.id);
            //let newPrice = reducePrice(state.cart[specificIndexD], action.quantity, action.price);
            console.log(`objekt ti je ${JSON.stringify(state.cart[specificIndexD].quantity)}`)
            console.log(`indeks ti je ${specificIndexD}, a price ${action.after}, a state ${state.cart[specificIndexD].after}`);
            let newPrice = state.cart[specificIndexD].after + action.after;
            console.log(`newPrice ti sad iznosi ${newPrice}`);
            let decNumber = state.numOfItems - 1;
            if(specificIndexD >= 0){
                return {
                    ...state,
                    numOfItems: decNumber,
                    cart: state.cart.map((item, idx) =>
                        idx === specificIndexD
                        ? 
                        {
                            ...item,
                            quantity: item.quantity - 1,
                            after : newPrice
                        }
                        :item
                    ),
                };
            }

    default:
      return state;
  }
}

export default reducer;