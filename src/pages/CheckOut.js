import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RiLoader4Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CartTotal } from '../components/common/CartTotal'
import { Select, SelectItem } from '../components/common/Select'

import { getCustomerContact } from '../store/features/customers/getCustomer'
import { TextInput } from '../components/common/TextInput'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { FormatPhoneNumberToCountryCode } from '../components/common/PhoneNumberCountryCode'
import { Wrapper } from '../components/common/Wrapper'
import { useCurrency } from '../utils/CurrencyProvider'
import usePageTitle from '../hook/usePageTitle'
import { countries } from '../libs/constants'
import { useAddCustomerContactMutation, useUpdateCustomerContactMutation, useGetShippingAddressQuery, useAddShippingAddressMutation, useGetCustomerContactQuery,useGetCustomerProfileQuery, useUpdateUserProfileMutation } from '../services/api'
import { updateCustomerContact } from '../store/features/customers/updateCustomer'
function hasAllValues(obj) {
	return Object.values(obj).every(value => value !== undefined && value !== null && value !== '')
}

export const Checkout = () => {
  // Hooks and state management
  usePageTitle('Checkout | Amaraé');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.auth);
  const {data:userData} = useSelector((state) => state.signUp);
  const { countryCode } = useCurrency();
  const { data:customerProfile,  isLoading:customerLoading } = useGetCustomerProfileQuery()
  // API Queries and Mutations
  const { data: shippingAddress, isLoading } = useGetShippingAddressQuery();
  const [addShippingAddress, { isLoading: isPending }] = useAddShippingAddressMutation();
  const [addCustomerContact] = useAddCustomerContactMutation();
  const [updateCustomerContact] = useUpdateCustomerContactMutation();
  const { data: getCustomerContact, isFetching, isSuccess } = useGetCustomerContactQuery();
  const [updateUserProfile, { isLoading:updateuserloading, isSuccess: updateUserSuccess }] = useUpdateUserProfileMutation();
//   filter out customer Number
const userObject = customerProfile?.find((item) => item?.email === user.email);
console.log(userObject, "userObject");

	const handleUpdate = async (newNumber) => {
		try {
		  await updateUserProfile({ id: userObject?.id, data: { mobile:newNumber } }).unwrap();
		 // toast.success('Profile updated successfully!');
		} catch (error) {
		  toast.error('Failed to update profile:number already exisit');
		}
	  };


  // Form setup
  const { control, handleSubmit, formState: { isDirty } } = useForm({
    values: {
      full_name: user?.full_name ?? '',
      email: user?.email ?? '',
      city: shippingAddress?.city ?? '',
      country: shippingAddress?.country ?? '',
      contact: Array.isArray(getCustomerContact) && getCustomerContact.length 
        ? getCustomerContact[0]?.phone 
        : userObject?.mobile ?? '',
      postal_code: shippingAddress?.postal_code ?? '',
      street_address: shippingAddress?.street_address ?? '',
    },
  });

  // Helper functions
  const hasAllValues = (obj) => {
    return Object.values(obj).every(value => value !== undefined && value !== null && value !== '');
  };


  // Handlers
  const onSubmit = async (data) => {
    
    const formattedNumber = FormatPhoneNumberToCountryCode(data.contact, countryCode);

	if (userObject?.mobile !== data.contact){
      await handleUpdate(data.contact);
	}
    console.log(formattedNumber, "formattedNumber")
    if (hasAllValues(data) && !isDirty) {
      navigate('/payment');
      return;
    }

    try {
      await addShippingAddress({
        ...data,
        apartment_address: data.street_address,
        default: true,
        address_type: 'S',
      }).unwrap();
      
      toast.success('Shipping address added successfully!');
      navigate('/payment');
    } catch (error) {
      console.error('Error submitting checkout form:', error);
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  // Effects
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      toast.error('You must be logged in to checkout!');
    }
  }, [token]);

console.log(userData, "userData");
  // Render
  return (
    <WebsiteLayout>
      <section className='py-10'>
        <Wrapper>
          <Breadcrumbs />
          
          <div className='lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10'>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <CheckoutForm 
                control={control} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit} 
              />
            )}

            <CartTotal isPending={isPending && updateuserloading} btnText='Proceed to Payment' />
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};

// Sub-components for better organization
const Breadcrumbs = () => (
  <div className='text-xs text-[#515655] flex items-center gap-2'>
    <Link className='hover:underline' to='/'>Home</Link>
    <p>/</p>
    <Link className='hover:underline' to='/shop'>Shop</Link>
    <p>/</p>
    <p className='text-rebel-ruby-100'>Checkout</p>
  </div>
);

const LoadingIndicator = () => (
  <div className='flex col-span-2 items-center gap-2 justify-center'>
    <RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
    <p className='font-medium'>Loading...</p>
  </div>
);

const CheckoutForm = ({ control, handleSubmit, onSubmit }) => (
  <form
    id='form'
    onSubmit={handleSubmit(onSubmit)}
    className='col-span-2 flex flex-col gap-6'
  >
    <div className='flex items-center gap-2 justify-between'>
      <h2 className='font-bold text-lg font-abril'>Your Information</h2>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <TextInput
        control={control}
        name='full_name'
        type='text'
        label='Full Name'
        required
        disabled
      />
      <TextInput
        control={control}
        name='email'
        type='email'
        label='Email Address'
        required
        disabled
      />
      <TextInput
        control={control}
        name='contact'
        type='text'
        label='Phone Number'
        required
      />
      <Select
        control={control}
        name='country'
        label='Choose Country/Region'
      >
        {countries.map(country => (
          <SelectItem key={country.id} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </Select>
      <TextInput
        control={control}
        name='city'
        type='text'
        label='Enter State/Province'
        required
      />
      <TextInput
        control={control}
        name='street_address'
        type='text'
        label='Enter Street Address'
        required
      />
      <TextInput
        control={control}
        name='postal_code'
        type='text'
        label='Enter Postal Code'
        required
      />
    </div>
  </form>
);

