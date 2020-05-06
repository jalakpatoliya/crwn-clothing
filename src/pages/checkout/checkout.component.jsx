import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartItemsTotal } from "../../redux/cart/cart.selectors";

import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.components";

const CheckoutPage = ({ cartItems, total }) => {
    console.log(cartItems);

    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    Product
                </div>
                <div className='header-block'>
                    Description
                </div>
                <div className='header-block'>
                    Quantity
                </div>
                <div className='header-block'>
                    Price
                </div>
                <div className='header-block'>
                    Remove
                </div>

            </div>
            {
                cartItems.map(item => {
                    return (
                        <CheckoutItem key={item.id} checkoutItem={item} />
                    )
                })
            }

            <div className='total'>
                TOTAL:${total}
            </div>

            <div className='test-warning'>
                *Please use the following test credit card for pyaments*
                 <br />
                4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
            </div>

            <StripeCheckoutButton price={total} />

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage);