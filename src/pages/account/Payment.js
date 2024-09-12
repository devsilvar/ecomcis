import React, {useState} from 'react';
import Header from '../../components/common/Header';
import Container from '../../ui/Container';

import { ToastContainer, toast } from 'react-toastify';

import { PaystackButton } from 'react-paystack';

import { test_key } from '../../store/features/payment/initiatePaystack';

import GooglePayButton from '@google-pay/button-react';
import { Link } from 'react-router-dom';
import Input from '../../components/admin/form/Input';
import { formatMoney } from '../../utils/nairaFormat';
import { wallxPayment } from '../../store/features/payment/wallX';

import { useDispatch } from 'react-redux';
import { useCurrency } from '../../utils/CurrencyProvider';


function Payment(){
    const {currency, conversionRate} = useCurrency();
    const [showModal, setShowModal] = useState(false);
    const orderStored = JSON.parse(sessionStorage.getItem("order"))

    const dispatch = useDispatch()

    const handleCloseModal = ()=>{
        setShowModal(false)
    }
    const handleOpenModal = ()=>{
        setShowModal(true)
    }
    const paymentSuccessfulAlert = () =>{
        toast("Order Successfully placessed")
        setTimeout(()=>{
            window.location.href = "/order-confirmed"
        }, 1000)
    }


    const handleCurrencyConversion = (amount, currency) => {
        let exchangeRate = localStorage.getItem("exchangeRates")
        const ratesFromStorage = exchangeRate ? JSON.parse(exchangeRate) : null;
    
        if (!ratesFromStorage || !ratesFromStorage[currency]) {
            console.error(`Exchange rate for ${currency} not found`);
            return amount.toFixed(2); // Return the original amount with 2 decimal places if no rate is found
        }
    
        let conversionRate = ratesFromStorage[currency] || 1;
        let convertedAmount = amount * conversionRate;
    
        return convertedAmount.toFixed(2);
    };
    


    const componentProps = {
        email: orderStored.payment.email,
        amount: handleCurrencyConversion(orderStored.payment.amount, currency) * 100,
        publicKey:test_key,
        text: "Pay Now",
        onSuccess: () => paymentSuccessfulAlert(),
        onClose: () => alert("Wait! are you sure you want to cancel??"),
    
      }

    const [wallxPin, setWallxPin] = useState("")
    const [wallxSecret, setWallxSecret] = useState("")
    const merchant_id = process.env.WALLX_MERCHANT_ID


    const handleWallxPayment = (e) =>{
        e.preventDefault()
        let payload = {
            "merchant_id": merchant_id,
            "pin": wallxPin,
            "secret": wallxSecret,
            "amount": handleCurrencyConversion(orderStored.payment.amount, currency),
            "currency": currency
        }

        dispatch(wallxPayment(payload))
    }


    return(
        <div>
            <ToastContainer/>
            <div class={`${showModal ? 'flex' : 'hidden'} font-abril fixed top-[0] left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow mb-3 mt-5">
                        <button onClick={handleCloseModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-y-auto p-7 ">
                        <div className=' flex flex-col justify-center items-center'>
                            <div>
                                <img src='images/wallx.png' className='w-[80px] mx-[auto] mb-[8px]' alt="wallx"/>
                            </div>
                            <p>
                                Paying with WallX is an easier way to make payment, please proceed to apply your <strong>PayCode</strong> and <strong>Secret Word</strong><br/> <hr/> <br/>
                                <strong className='text-[2em]'>{formatMoney(orderStored.payment.amount, currency, conversionRate)}</strong>
                            </p>
                        </div>
                    <form>
                        <Input 
                            topText="PayCode" 
                            name="paycode" 
                            placeholder="Enter your generated payment paycode" 
                            type="text"
                            value={wallxPin}
                            required={true}
                            className="mt-[23px]" 
                            onChange={(e)=>(setWallxPin(e.target.value))}
                            />
                        <Input 
                            topText="Secret Word" 
                            name="secret" 
                            placeholder="Enter your secret word used to generate paycode" 
                            type="text"
                            value={wallxSecret}
                            onChange={(e)=>(setWallxSecret(e.target.value))}
                            required={true}
                            className="mt-[23px]" 

                            />
                        <button 
                            onClick={handleWallxPayment}
                            className="text-[#fff] mt-4 border-[1px] rounded-[4px] px-[20px] py-[10px] flex bg-[#19115F]">
                            Pay {formatMoney(orderStored.payment.amount, currency, conversionRate)}
                        </button>
                    </form>

                    </div>
                </div>
            </div>
            <Header />
            <Container>
            <div className="w-[100%] border-[1px] p-[16px] h-full flex flex-col  items-center">
                <h1 className='text-[2em]'>Select payment option</h1>

                <div className='flex gap-[10px]'>
                    <div className="p-5 w-[50%] flex justify-center items-start flex-col">
                        <div className='flex gap-[20px] '>
                            {currency === "NGN" ?

                            <PaystackButton 
                                text='Pay with Paystack' {...componentProps}
                                className="text-[#09A5DB] rounded-[4px] mb-[10px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#011B33]">
                            </PaystackButton>
                            : ""
                            }
                            
                            <button 
                                onClick={handleOpenModal}
                                className="text-[#19115F] border-[1px] mb-[10px] rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#fff]">
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
                                    totalPrice: handleCurrencyConversion(orderStored.payment.amount, currency),
                                    currencyCode: currency,
                                    countryCode: currency,
                                    },
                                }}
                                onLoadPaymentData={paymentRequest => {
                                    console.log('load payment data', paymentRequest);
                                }}
                                />
                        </div>
                    </div>

                </div>
            </div>
            
            </Container>
        </div>
    )
}
export default Payment;