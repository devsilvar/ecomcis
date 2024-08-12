import React from "react";
import { US } from 'country-flag-icons/react/3x2'



let currency = {
    "NGN": "₦",
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "CAD": "$",
}




const CurrencyFlag = ()=>{
    return <>
        <select>
            {
                Object.keys(currency).map((key, index) => {
                    return <option key={index} value={key}>{currency[key]} {key}</option>
                })
            }
        </select>
    </>
}

export default CurrencyFlag