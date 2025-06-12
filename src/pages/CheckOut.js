import * as React from 'react'
import { useForm , useWatch } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RiLoader4Line } from 'react-icons/ri'
import { useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CartTotal } from '../components/common/CartTotal'
import { Select, SelectItem } from '../components/common/Select'
import { TextInput } from '../components/common/TextInput'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import usePageTitle from '../hook/usePageTitle'
import { countries } from '../libs/constants'
import { useGetShippingAddressQuery, useAddShippingAddressMutation,useGetCustomerProfileQuery, useUpdateUserProfileMutation , useGetUserLocationQuery, useUpdateShippingAddressMutation } from '../services/api'
import { useAddressCoordinates } from '../hook/useAddressCordinates'

// function hasAllValues(obj) {
// 	return Object.values(obj).every(value => value !== undefined && value !== null && value !== '')
// }

export const Checkout = () => {
  // Hooks and state management
  usePageTitle('Checkout | Amaraé');
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.auth);



    // check if the user in authticated
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      toast.error('You must be logged in to checkout!');
    }
  }, [token]);



  //States
  // const [selectedCountry, setSelectedCountry] = React.useState('');
  // const [address, setAddress] = React.useState('');
  const [triggerSearch, setTriggerSearch] = React.useState(false);
  
  
  //API and Queries Mutations
  const { data:userLocation, isLoading } = useGetUserLocationQuery()
  const {data:userData} = useSelector((state) => state.signUp);
  const { data:customerProfile,  isLoading:customerLoading } = useGetCustomerProfileQuery() 
  const { data: shippingAddress, isLoading:shippingLoading } = useGetShippingAddressQuery();
  const [addShippingAddress, { isLoading: isPending }] = useAddShippingAddressMutation();
  const [updateUserProfile, { isLoading:updateuserloading, isSuccess: updateUserSuccess }] = useUpdateUserProfileMutation();
  const [updateShippingAddress, { isLoading:updateShipingloading, error:updateShippingerror }] = useUpdateShippingAddressMutation();



//   filter out customer profile details based on the email so i can see the full profile
const userObject = customerProfile?.find((item) => item?.email === user?.email);

    // Form setup for the react use form to give intial values to e.g boxes
  const { control, handleSubmit, formState: { isDirty } } = useForm({
    values: {
      full_name: user?.full_name ?? '',
      email: user?.email ?? '',
      city:  shippingAddress?.city ? shippingAddress?.city : userLocation?.region ?? '', // this will show the state
      country: shippingAddress?.country ?? '',  //this will show he code first e.g NG
      contact  : userObject?.mobile ?? '',
      postal_code: shippingAddress?.postal_code ?? '',
      street_address: shippingAddress?.street_address ?? '',
    },
  });


const { selectedCountry,  address, data: addresspoints, error, isLoading: addressLoading ,setSelectedCountry,
    setAddress, } = useAddressCoordinates(control);

const anyLoading = isLoading || shippingLoading || customerLoading || addressLoading;




  //get country name from selected Code so i can add the country name to get the lat and long
//   const getCountryNameByCode = (code) => {
//     const country = countries.find(country => country.code === code);
//     setSelectedCountry(country ? country.name : '');
//     return country ? country.name : '';
// };



  // Helper function to check if all values in the form are filled
  const hasAllValues = (obj) => {
    return Object.values(obj).every(value => value !== undefined && value !== null && value !== '');
  };

// //watch if country chnages or state chnages  
// const [country, city] = useWatch({
//   control,
//   name: ["country", "city"],
// });

const handleUpdateAdress = async (id, data) => {
  try {
    await updateShippingAddress({id, ...data}).unwrap();
    // If the update is successful, let me know
    toast.success("Shipping address updated successfully");
  } catch (err) {
    toast.error("Failed to update address");
  }
}

  // Set initial value of selectedCountry and form control based on shippingAddress country
  // React.useEffect(() => {
  //   // get the country name from the shipping address country code
  //   if (shippingAddress?.country) {
  //     const countryName = getCountryNameByCode(shippingAddress.country);
  //     setSelectedCountry(countryName);
  //   }

  //  // if country or city changes
  //   if (shippingAddress?.city && userLocation?.region) {
  //     console.log(`${shippingAddress.city} ${userLocation?.region} ${selectedCountry}`);
  //     setAddress(`${shippingAddress.city} ${userLocation?.region} ${selectedCountry}`);
  //      }
  // }, [shippingAddress , country, city , address]);




  // set the full address once the componnet mounts so i can see if i can sedn to cordinates
  // const fullAddress = React.useMemo(() => {
  //   if (shippingAddress) {
    //     console.log(`${shippingAddress.city} ${userLocation?.region} ${selectedCountry}`);
    //     setAddress(`${shippingAddress.city} ${userLocation?.region} ${selectedCountry}`);
  //      }
  // }, [shippingAddress, selectedCountry]);

  // //instantitate the cordinate to get the latitude and longitude
  // const { data: addresspoints, error, isLoading: addreeesLoading } = useGetCoordinatesByAddressQuery(address);
  console.log(address , "address")
  console.log(addresspoints, "datas" , error)
  
  
// React.useEffect(() => {
//  setTriggerSearch(true);
//   if (shippingAddress) {
//     setAddress(`${shippingAddress?.city} ${userLocation.region} ${selectedCountry} `);
//   }
// }, [address, shippingAddress]);




const handleUpdate = async (newNumber) => {
		try {
		  await updateUserProfile({ id: userObject?.id, data: { mobile:newNumber } }).unwrap();
		 // toast.success('Profile updated successfully!');
		} catch (error) {
		  toast.error('Failed to update profile:number already exisit');
		}
	  };



 

console.log(selectedCountry, "selectedCountry");
console.log(shippingAddress, "shippingAddress");
console.log(userLocation?.region, "userLocation");


  // Handlers
  const onSubmit = async (data) => {
//updating the useCity and country if its is diffrent from the one there before
if (shippingAddress?.city !== data.city || shippingAddress?.country !== data.country) {
  await handleUpdateAdress(shippingAddress?.id, {
    city: data.city,
    country: data.country,
  })
}

    //updating the user contact number if its is diffrent from
	if (userObject?.mobile !== data.contact){
      await handleUpdate(data.contact);
	}
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


  // Render
  return (
    <WebsiteLayout>
      <section className='py-10'>
        <Wrapper>
          <Breadcrumbs />
          
          <div className='lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10'>
            {anyLoading ? (
              <LoadingIndicator />
            ) : (
              <CheckoutForm 
                control={control} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit} 
                setselectedCountry={setSelectedCountry}
                addressLoading={addressLoading}
              />
            )}

            <CartTotal isPending={isPending && updateuserloading} handleUpdate={handleUpdateAdress} btnText='Proceed to Payment' />
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

const CheckoutForm = ({ control, handleSubmit, onSubmit, setSelectedCountry, addressLoading }) => (
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
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries.map(country => {
         return <SelectItem key={country.id} value={country.code}>
            {country.name}
          </SelectItem>
        })}
      </Select>

      <TextInput
        control={control}
        name='city'
        type='text'
        label={addressLoading ? "...updating": "Enter State/Province"} 
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

