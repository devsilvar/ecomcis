import React, {useState} from 'react';
import Header from '../../components/common/Header';
import Container from '../../ui/Container';
import Input from '../../components/admin/form/Input';
import { ToastContainer, toast } from 'react-toastify';

import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';

import { test_key } from '../../store/features/payment/initiatePaystack';


function Payment(){

    const orderStored = JSON.parse(sessionStorage.getItem("order"))

    const config = {
        email: orderStored.payment.email,
        amount: orderStored.payment.amount * 100,
        reference: orderStored.payment.reference,
        publicKey: test_key,
    }

    const componentProps = {
        email: orderStored.payment.email,
        amount: orderStored.payment.amount * 100,
        publicKey:test_key,
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    
      }
    console.log("ORDER DETAILS:, ", orderStored)
    console.log(config)
    const initializePayment = usePaystackPayment(config);

    return(
        <div>
            <Header />
            <Container>
            <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
                <h1>Select payment option</h1>
                <div className="flex gap-[10px]">
                    <PaystackButton {...componentProps}
                     className="text-[#09A5DB] rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#011B33]">
                        <img className="w-[25px] h-[25px]" src='/images/paystack.png'/>
                        Pay with Pastack
                    </PaystackButton>
                    <button className="text-[#19115F] border-[1px] rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#fff]">
                    <img className="w-[25px] h-[25px]" src='/images/wallx.png'/>
                        Pay with WallX
                    </button>
                </div>

                <div className='w-[400px] bg-[#fff] border-2x text-[#4E0240] p-3 rounded'>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-lg font-medium mb-6">Payment Information</h2>
                    <form>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="col-span-2 sm:col-span-1">
                                <label for="card-number" class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="expiration-date" class="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                                <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="cvv" class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                <input type="text" name="cvv" id="cvv" placeholder="000" class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="card-holder" class="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                                <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                            </div>
                        </div>
                        <div class="mt-8">
                            <button type="submit" class="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            
            </Container>
        </div>
    )
}
export default Payment;