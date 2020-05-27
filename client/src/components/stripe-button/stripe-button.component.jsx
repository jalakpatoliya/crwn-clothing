import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_TzKq6kEKm0ldmQoOX3JBRf9Z00iuf7TKdM';

  const onToken = async token => {
    try {
      const response = await axios({
        url: 'payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token
        }
      })

      alert('Payment successful')
    } catch (error) {
      console.log('Payment error:', JSON.parse(error));
      alert('There was an issue with the payment. Please make sure you use provided credit card.')
    }
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
