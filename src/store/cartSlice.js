import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState ={
    items: JSON.parse(Cookies.get('cart-item-list') || '[]'),
}

const cartSlice = createSlice({
    name: "cart", 
    initialState ,
    reducers : {
        addToCart: (state, action) => {
            
            const newItem = action.payload;
      
            const productItemIndex = state.items.findIndex(
              (item) => item.id === newItem.id
            );
      
            if (productItemIndex >= 0) {
              state.items[productItemIndex].quantity = newItem.quantity;
            } else {
              
              state.items.push(newItem);
            }
            Cookies.set('cart-item-list', JSON.stringify(state.items), { expires: 7 });
        },
        clearCart: (state) => {
            state.items = [];
            Cookies.remove("cart-item-list");
        },
        setCartItems: (state, action) => {
            state.items = action.payload; 
            Cookies.set("cart-item-list", JSON.stringify(action.payload), { expires: 7 });
        },
      
    }
});

export const {addToCart , clearCart, setCartItems } = cartSlice.actions

export default cartSlice.reducer 