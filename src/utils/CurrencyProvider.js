import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("$");

    useEffect(() => {
        const storedCurrency = sessionStorage.getItem("currency");
        if (storedCurrency) {
            setCurrency(storedCurrency);
        }
    }, []);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        sessionStorage.setItem("currency", newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
