import { parsePhoneNumberFromString } from 'libphonenumber-js';
export const FormatPhoneNumberToCountryCode = (Number , countryCode) => {
    const phoneNumber = parsePhoneNumberFromString(Number, countryCode);
    console.log(phoneNumber.formatInternational());
    return phoneNumber.formatInternational()
}
