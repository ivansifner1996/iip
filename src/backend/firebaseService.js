import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import React from 'react'
import {db, storage} from '../firebase';

const baza = db.ref('product')

class firebaseService {
    
    getAll = () => {
        return baza;
    }

    getStorage = () => {
        return storage;
    }

    deleteFromStorage = (url) => {
        let pictureRef = storage.refFromURL(url);
        pictureRef.delete()
            .then(() => {console.log("obrisao si sliku iz storagea");
            }).catch((err) => {
                console.log(err);
            })
    }

    create = (product) => {
        console.log(baza);
        return baza.push(product)
    }

    update = (key, type, id, value) => {
        console.log(`key ti iznosi ${key}, type ti iznosi ${type},id : ${id}, value : ${JSON.stringify(value)}`);
        const categoryRef = db.ref(`category/products/${type}`);
        var query = categoryRef.orderByChild('product/id').equalTo(id);
        return query.once("value", function(snapshot) {
            if(snapshot.val() !== null){
                const Newkey = Object.keys(snapshot.val())[0];
                console.log(`new key ti je ${Newkey}`);
                categoryRef.child(Newkey).child('product').update(value);
                baza.child(key).update(value);
            }
        })
    }

    deleteRecord = (key, type, id) => {
        const categoryRef = db.ref(`category/products/${type}`);
        var query = categoryRef.orderByChild('product/id').equalTo(id);
        return query.once("value", function(snapshot){
            if(snapshot.val()!= null){
                const Newkey = Object.keys(snapshot.val())[0];
                categoryRef.child(Newkey).remove();
                baza.child(key).remove();
            }
        })
    }

    deleteAll = () => {
        return baza.remove();
    }

    addToCategory = (product, type) => {
        const categoryRef = db.ref(`category/products/${type}`);
        baza.push(Object.assign(product, {category : type}));
        return categoryRef.push({product});
    }

    getSpecificNumOfItems =  async() => {
        let limitedProducts = []       
        await baza.once('value')
        .then(function(snapshot) {
            snapshot.forEach(snap => {limitedProducts.push(snap.val())})
        })

        const result = limitedProducts.reduce((acc, d) => {
            console.log(`d before : ${d.before}, ${d.after}`);
            const discount = Math.round(Math.abs(((d.after - d.before) / d.before) * 100))
            acc.push({
                title : d.title,
                link : d.link,
                category : d.category,
                discount : discount,
                pathTo : d.tip
            })
            return acc;
        }, [])

        console.log(result);
        return Promise.all(result);
        }

    
    getItemsAndCategory = async(type, category) => {
        var categoryRef = db.ref('category/'+category+ type);
        var productsRef = db.ref(`category/products/${type}`);
        var category = [];
        var products = [];
        await categoryRef.once("value")
        .then(function(snap){
            category.push(snap.val())})
            await productsRef.once("value")
            .then(function(snaps){
                snaps.forEach(item => {
                    const data = item.val().product;
                    products.push(data);
                })
            });
            console.log(`kategoriaj ti iznosi ${category}`);
            console.log(`products are ${products}`);
            return Promise.all([products, category]);
        
    }

    getPriceById = async(id) => {
        let price;
        console.log(`id ti iznosi ${id}`);
        var query =  db.ref(`product`).orderByChild('id').equalTo(id);
        await query.once("value", function(snapshot){
            snapshot.forEach(snap => {
                price = snap.val().after;
                console.log(`price ti sad iznosi ${price}`);
            })
        }).then()
        return price;
    }

    putItemInCartByUser = (product, user) => {
        console.log(`product id ti iznosi ${product.id}`);
        const userProductRef = db.ref(`users/${user.email.substring(0, user.email.indexOf("@"))}/products`);
        return userProductRef.orderByChild("/product/id").equalTo(product.id).once("value", snapshot => {
            if(snapshot.exists()){
                snapshot.forEach(snap => {
                    const key = snap.key;
                    console.log(`product price za bazu ti je ${product.after}`);
                    const quantity = snap.val().product.quantity + product.quantity;
                    const bratwurst = {...snap.val()};
                    bratwurst.product.quantity = quantity;
                    console.log(`puna cijena ti iznosi ${product.after}`);
                    console.log(`product after ti iznosi ${product.after}`);
                    bratwurst.product.after = bratwurst.product.after + product.after;
                    console.log(`bratwurst after ti je ${bratwurst.product.after}`);
                    userProductRef.child(key).update(bratwurst);
                })
                const userData = snapshot.val();
                console.log("exists!", userData.key);
            }else{
                userProductRef.push({product});
            }
        })
    }

    getUserProducts = async(user) => {
        const userProductRef = db.ref(`users/${user.email.substring(0, user.email.indexOf("@"))}/products`);
        let products = [];
        await userProductRef.once("value")
            .then(function(snaps){
                snaps.forEach(item => {
                    const data = item.val().product;
                    products.push(data);
                })
            });
            if(products.length > 0){
                return Promise.all(products);
            }
            return
    }

    removeProductById = async (id, user) => {
        const userProductRef = db.ref(`users/${user.email.substring(0, user.email.indexOf("@"))}/products`);
        try{
            var query = userProductRef.orderByChild('product/id').equalTo(id);
            query.once('value', function(snapshot){
                snapshot.forEach((child) => {
                    child.ref.remove();
                })
            })

        }catch(error){
            console.log(`Desila se greska ${error.message}`)
        }
    }

    addMultipleProductsByUser = async (user, products) => {
        console.log(`user ti iznosi ${user}, a produkti ti iznose ${products}`);
        const userProductRef = db.ref(`users/${user.substring(0, user.indexOf("@"))}/products`);
        products.forEach(product => {
        userProductRef.push({product});
    });
    }
}
export default new firebaseService();
