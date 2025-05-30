import { acceptedCurrencies } from "../libs/constants";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
  AED: "DH",
  GHS: "GH₵",
  ZAR: "R",
  // Add other currency codes and symbols as needed
};

export const formatMoney = (value, currencyCode, conversionRate = 1) => {
  let number = Number(value) * conversionRate;

  // if (isNaN(number)) {
  //   console.error('The provided value is not a valid number:', value);
  //   return null;
  // }

  let formattedNumber = number.toFixed(2);
  formattedNumber = formattedNumber.replace(/\d(?=(\d{3})+\.)/g, "$&,");

  // Get the symbol from the currency code
  const currencySymbol = currencySymbols[currencyCode] || currencyCode;

  return currencySymbol + formattedNumber;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDateOnly = (timestamp) => {
  const date = new Date(timestamp);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
