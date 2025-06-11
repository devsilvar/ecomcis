import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { acceptedCurrencies  } from '../libs/constants'
import { useGetUserLocationQuery } from '../services/api'
import { fetchExchangeRates } from '../store/features/payment/currencyConverter'



const CurrencyContext = createContext()

export const useCurrency = () => useContext(CurrencyContext)

export const CurrencyProvider = ({ children }) => {
	const dispatch = useDispatch()
	const [currency, setCurrency] = useState('USD')
	const [conversionRate, setConversionRate] = useState(1)

	const { data, isLoading } = useGetUserLocationQuery()

	const isAdminRoute = window.location.pathname.includes('admin')

	useEffect(() => {
		dispatch(fetchExchangeRates())

		// Check for stored currency in session storage
		// if data, check if currency is in acceptedCurrencies, if not set to USD
		const accepted = acceptedCurrencies.map(currency => currency.code)
		const currency = isAdminRoute
			? 'USD'
			: data
			? accepted.includes(data?.currency)
				? data.currency
				: 'USD'
			: sessionStorage.getItem('currency' || 'USD')
console.log(data , "location of country")

		if (currency) {
      setCurrency(currency)
	   	}
	}, [dispatch, data, isAdminRoute])

	useEffect(() => {
		// Update the conversion rate when currency changes
		let exchangeRates = localStorage.getItem('exchangeRates')

		let ratesFromStorage = null

		if (exchangeRates) {
			ratesFromStorage = JSON.parse(exchangeRates)
		}
		// const ratesFromStorage = exchangeRates ? JSON.parse(exchangeRates) : null ;
		
		if (ratesFromStorage && currency) {
			setConversionRate(ratesFromStorage[currency] || 1) // Default to 1 if no rate
		}
	}, [currency])
	
	const changeCurrency = newCurrency => {
		setCurrency(newCurrency)
		sessionStorage.setItem('currency', newCurrency)
	}

	return (
		<CurrencyContext.Provider value={{ currency, conversionRate, changeCurrency, isLoading}}>
			{children}
		</CurrencyContext.Provider>
	)
}
