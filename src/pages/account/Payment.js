import React from 'react';
import Header from '../../components/common/Header';
import Container from '../../ui/Container';

import { ToastContainer, toast } from 'react-toastify';

import { PaystackButton } from 'react-paystack';

import { test_key } from '../../store/features/payment/initiatePaystack';

import GooglePayButton from '@google-pay/button-react';


function Payment(){

    const orderStored = JSON.parse(sessionStorage.getItem("order"))

    const paymentSuccessfulAlert = () =>{
        toast("Order Successfully placessed")
        setTimeout(()=>{
            window.location.href = "/account/my-orders"
        }, 1000)
    }

    const componentProps = {
        email: orderStored.payment.email,
        amount: orderStored.payment.amount * 100,
        publicKey:test_key,
        text: "Pay Now",
        onSuccess: () => paymentSuccessfulAlert(),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    
      }

    const handleWallxPayment = () =>{
        let payload = {
            "merchant_id": "WallX-00000112", // Your business's merchant ID
            "pin": "409265",
            "secret": "test",
            "amount": orderStored.payment.amount,
            "currency": "NGN" // Options: NGN, USD, CAD
        }
    }

    return(
        <div>
            <ToastContainer/>
            <Header />
            <Container>
            <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
                <h1>Select payment option</h1>
                <div className="flex gap-[10px] flex-wrap">
                    <PaystackButton text='Pay with Paystack' {...componentProps}
                     className="text-[#09A5DB] rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#011B33]">
                    </PaystackButton>

                    <button className="text-[#19115F] border-[1px] rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#fff]">
                        <img className="w-[25px] h-[25px]" src='/images/wallx.png'/>
                        Pay with WallX
                    </button>

                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                            {
                                type: 'CARD',
                                parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                },
                                tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                    gateway: 'example',
                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                },
                                },
                            },
                            ],
                            merchantInfo: {
                            merchantId: '12345678901234567890',
                            merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice: orderStored.payment.amount,
                            currencyCode: 'NGN',
                            countryCode: 'NGN',
                            },
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('load payment data', paymentRequest);
                        }}
                        />
                </div>
            </div>
            
            </Container>
        </div>
    )
}
export default Payment;