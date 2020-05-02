import React from 'react';
import { connect } from "react-redux";

import './checkout-item.styles.scss';

import { clearItemFromCart, removeItemFromCart, addItemToCart } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ checkoutItem, clearItemFromCart, addItemToCart, removeItemFromCart }) => {
    const { imageUrl, name, price, quantity } = checkoutItem
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>

            <span className='name'>{name}</span>
            <div className='quantity'>
                <div onClick={() => removeItemFromCart(checkoutItem)} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={() => addItemToCart(checkoutItem)} className='arrow'>&#10095;</div>
            </div>
            <span className='price'>{price}</span>

            <div className="remove-button" onClick={() => clearItemFromCart(checkoutItem)
            }>
                &#10005;
        </div>
        </div >
    )
}

const mapDispatchToProps = dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item)),
    addItemToCart: item => dispatch(addItemToCart(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);