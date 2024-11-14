import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState ={
    items: JSON.parse(Cookies.get('cart-item-list') || '[]'),
}

const cartSlice = createSlice({
    name: "cart", 
    initialState ,
    reducers : {
        addToCart : (state ,action) => {
            const {productItemId , userId ,quantity } = action.payload ;
            const productItemIndex =  (state.items).findIndex(item =>  item.productItemId === productItemId);
            if(productItemIndex >=0 ) {
                state.items[productItemIndex].quantity +=quantity
            }else {
                state.items.push({productItemId , userId ,quantity});
            }
            
            Cookies.set('cart-item-list', JSON.stringify(state.items), { expires: 7 });
        }
    }
});

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer 