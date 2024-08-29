import React, {useState, useEffect} from "react";




const CurrencyFlag = () => {
    const [useCurrency, setUseCurrency] = useState("$");

    useEffect(() => {
        // Retrieve the currency from sessionStorage on component mount, if it exists
        const storedCurrency = sessionStorage.getItem("currency");
        if (storedCurrency) {
            setUseCurrency(storedCurrency);
        }
    }, []);

    const handleChange = (e) => {
        setUseCurrency(e.target.value);
        sessionStorage.setItem("currency", e.target.value);
    };

    return (
        <div>
            <select
                value={useCurrency}
                onChange={handleChange}
                className="border-r-[1px] pr-[16px]"
            >
                <option value="₦">₦ NGN</option>
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="$">$ CAD</option>
            </select>
        </div>
    );
};
export default CurrencyFlag