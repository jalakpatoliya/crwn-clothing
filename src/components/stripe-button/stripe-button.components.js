import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

import './stripe-button.styles.scss'

const onToken = (token) => {
    console.log(token);
    alert('Payment Successfull')

}

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_TzKq6kEKm0ldmQoOX3JBRf9Z00iuf7TKdM'
    return (
        <div className='button'>
            <StripeCheckout
                label='Pay Now'
                name='CRWN Clothing Ltd.'
                billingAddress
                shippingAddress
                image='https://sendeyo.com/up/d/f3eb2117da'
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>
    )
}

export default StripeCheckoutButton;