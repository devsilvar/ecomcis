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


function Payment(){
    const [showModal, setShowModal] = useState(false);
    const orderStored = JSON.parse(sessionStorage.getItem("order"))

    const handleCloseModal = ()=>{
        setShowModal(false)
    }
    const handleOpenModal = ()=>{
        setShowModal(true)
    }
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
            <div class={`${showModal ? 'flex' : 'hidden'} font-abril fixed top-0 left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow mb-3">
                        <button onClick={handleCloseModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-y-auto p-7">
                        <div className=' flex flex-col justify-center items-center'>
                            <div>
                                <img src='images/wallx.png' className='w-[80px] mx-[auto] mb-[8px]' alt="wallx"/>
                            </div>
                            <p>
                                Paying with WallX is an easier way to make payment, please proceed to apply your <strong>PayCode</strong> and <strong>Secret Word</strong><br/> <hr/> <br/>
                                <strong>{formatMoney(orderStored.payment.amount)}</strong>
                            </p>
                        </div>
                    <form>
                        <Input 
                            topText="PayCode" 
                            name="paycode" 
                            placeholder="Enter your generated payment paycode" 
                            type="text"
                            required={true}
                            className="mt-[23px]" 

                            />
                        <Input 
                            topText="Secret Word" 
                            name="secret" 
                            placeholder="Enter your secret word used to generate paycode" 
                            type="text"
                            required={true}
                            className="mt-[23px]" 

                            />
                        <button 
                            className="text-[#fff] mt-4 border-[1px] rounded-[4px] px-[20px] py-[10px] flex bg-[#19115F]">
                            Pay {formatMoney(orderStored.payment.amount)}
                        </button>
                    </form>

                    </div>
                </div>
            </div>
            <Header />
            <Container>
            <div className="w-[100%] border-[1px] p-[16px] h-full flex flex-col  items-center">
                <h1>Select payment option</h1>

                <div className='flex gap-[10px]'>
                    <div className="p-5 w-[50%] flex justify-center items-start flex-col">
                    <>
                        <PaystackButton text='Pay with Paystack' {...componentProps}
                        className="text-[#09A5DB] rounded-[4px] mb-[10px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#011B33]">
                        </PaystackButton>

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
                                totalPrice: orderStored.payment.amount,
                                currencyCode: 'NGN',
                                countryCode: 'NGN',
                                },
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                            />
                    </>
                    </div>

                    <div className='w-[50%] hidden lg:block'>
                        <img className='w-[100%]' src='images/payment.svg' />
                    </div>
                </div>
            </div>
            
            </Container>
        </div>
    )
}
export default Payment;