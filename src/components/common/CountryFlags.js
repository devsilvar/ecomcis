import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrency } from "../../utils/CurrencyProvider";
import { currencyConvert } from "../../store/features/payment/currencyConverter";

const CurrencyFlag = () => {
    const { currency, changeCurrency } = useCurrency();

    const handleChange = (e) => {
        changeCurrency(e.target.value);
    };

    return (
        <div>
            <select
                value={currency}
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

export default CurrencyFlag;
