import { Box, Button, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useUsers from '../../../Custom Hook/useUsers';
import { postOrders } from '../../../Redux/actions';

const Payment = ({ total, shippingDetails, createdOrder, setShippingDetails, setError, cart }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [user] = useUsers();

    // console.log(createdOrder)
    const amount = parseInt(total)

    useEffect(() => {
        fetch("http://localhost:5000/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data?.data?.clientSecret) {
                    setClientSecret(data.data.clientSecret);
                }
            })
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            name: user?.firstName + ' ' + user?.lastName,
            email: user?.email
        }
        if (shippingDetails.phone === '') {
            setError({ phone: 'This field is required' })
        }
        else if (shippingDetails.address === '') {
            setError({ address: 'This field is required' })
        }
        else if (shippingDetails.paymentMethod === '') {
            setError({ paymentMethod: 'Please select your payment method' })
        }
        else {
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
                    // console.log(result)
                    // Handle result.error or result.paymentIntent
                    if (result.paymentIntent) {
                        setCardError('');
                        setSuccess('Your payment is completed');
                        setTransactionID(result.paymentIntent.id);
                        const payment = {
                            transactionID: result.paymentIntent.id,
                        }
                        // console.log(payment);
                        const orderData = {
                            ...shippingDetails, ...userInfo, payment
                        }

                        fetch(`http://localhost:5000/payment`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(payment)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(orderData)

                                dispatch(postOrders(orderData))
                                setProcessing(false);
                            });
                    }

                    if (result.error) {
                        setCardError(result.error.message);
                        setProcessing(false);
                    }
                });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ border: '2px solid #4b38b3', p: 2, borderRadius: '5px' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#43444a',
                                    },
                                    border: '2px solid violet'
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Box>
                {
                    cardError && <Typography color="#f06548" mt={1}> {cardError} </Typography>
                }
                {
                    success && <Typography color="#45cb85" mt={1}> {success} <br /> Transaction ID: {transactionID} </Typography>
                }
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant='contained' sx={{ mt: 6 }}
                        disabled={!stripe || !clientSecret || success || cart?.length === 0 }
                    >
                        Pay & Place Order
                    </Button>
                </Box>
            </form>

        </>
    );
};

export default Payment;