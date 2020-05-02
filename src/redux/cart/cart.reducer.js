import { CartActionTypes } from './cart.type'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                cartItems: addItemToCart({ cartItems: state.cartItems, cartItemToAdd: action.payload })
            };

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: clearItemFromCart({ cartItems: state.cartItems, cartItemToRemove: action.payload })
            }
        case CartActionTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: removeItemFromCart({ cartItems: state.cartItems, cartItemToRemove: action.payload })
            };

        default:
            return state;
    }
}

export default cartReducer;