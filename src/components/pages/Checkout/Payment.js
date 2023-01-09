import { Button } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Payment = ({ total, shippingDetails, createdOrder }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    // const { name, email } = shippingDetails;
    console.log(shippingDetails)
    const t = parseInt(total)
    // console.log(typeof(t))
    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ t }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data?.data?.clientSecret) {
                    setClientSecret(data.data.clientSecret);
                }
            })
    }, [t]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: shippingDetails.name,
                    email: shippingDetails.email
                },
            },
        })
            .then(function (result) {
                console.log(result)
                // Handle result.error or result.paymentIntent
                if (result.paymentIntent) {
                    setCardError('');
                    setSuccess('Your payment is completed');
                    setTransactionID(result.paymentIntent.id);

                    const payment = {
                        orderId: createdOrder.data.data._id,
                        transactionID: result.paymentIntent.id,
                        // status: 'Pending'
                    }

                    // fetch(`https://techfly-api.onrender.com/purchase/${_id}`, {
                    //     method: 'PATCH',
                    //     headers: {
                    //         'content-type': 'application/json',
                    //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    //     },
                    //     body: JSON.stringify(payment)
                    // })
                    //     .then(res => res.json())
                    //     .then(data => {
                    //         setProcessing(false);
                    //     });
                }
                if (result.error) {
                    setCardError(result.error.message);
                    setProcessing(false);
                }
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button type="submit"
                    disabled={!stripe || !clientSecret || success}
                >
                    Pay
                </Button>

            </form>
            {
                cardError && <p className='text-error font-semibold pt-1'>{cardError}</p>
            }
            {
                success && <p className='text-success font-semibold pt-1'>{success} <br /> Transaction ID: {transactionID} </p>
            }
        </>
    );
};

export default Payment;