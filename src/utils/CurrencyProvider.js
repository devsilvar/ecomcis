import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeRates } from "../store/features/payment/currencyConverter";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState("GBP");
    const [conversionRate, setConversionRate] = useState(1);

    useEffect(() => {
        // Fetch exchange rates on initial load
        dispatch(fetchExchangeRates());

        // Check for stored currency in session storage
        const storedCurrency = sessionStorage.getItem("currency");
        if (storedCurrency) {
            setCurrency(storedCurrency);
        }
    }, [dispatch]);

    useEffect(() => {
        // Update the conversion rate when currency changes
        let exchangeRates = localStorage.getItem("exchangeRates")
        const ratesFromStorage = exchangeRates ? JSON.parse(exchangeRates) : null ;

        if (ratesFromStorage && currency) {
            setConversionRate(ratesFromStorage[currency] || 1); // Default to 1 if no rate
        }
    }, [currency]);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        sessionStorage.setItem("currency", newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, conversionRate, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
