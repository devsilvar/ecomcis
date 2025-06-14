import { House, HouseIcon, LocateIcon, LocationEdit } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { FiHome, FiGlobe, FiDollarSign, FiSave } from 'react-icons/fi';
import { useGetCountriesQuery } from '../../services/api';

import {useGetCoordinatesByAddressQuery , useLazyGetCoordinatesByAddressQuery,} from  "../../services/geoAPi"
import useStateLocation from '../../hook/useStateLocation';


const ShippingSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('domestic');
  const [settings, setSettings] = useState({
    nigeriaFlatRate: '',
    internationalRate: '',
    internationalCap: '',
    country: 'Nigeria',
  state: '',
  address:''

  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
const { data: countriesData, isLoading: countriesLoading } = useGetCountriesQuery();
  const { states, isLoading:loadingStates } = useStateLocation(settings.country);
  const [getCoordinates, { data: coordinatesData, isLoading: isCoordinatesLoading }] = useLazyGetCoordinatesByAddressQuery();
 
//s  console.log(countriesData, "countries data");
function useDebouncedValue(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
  // Simulate loading settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      // Replace with actual API call
      setTimeout(() => {
        setSettings({
          nigeriaFlatRate: '2500',
          internationalRate: '5',
          internationalCap: '100'
        });
        setIsLoading(false);
      }, 500);
    };
    
    fetchSettings();
  }, []);

  const handleSave =  async() => {
    setIsSaving(true);
    console.log('Saving settings:', settings);
    try {
      // Replace with actual API call
       const fullAddress = `${settings.state}, ${settings.country}`;
    const result = await getCoordinates(fullAddress).unwrap();

    console.log('Coordinates:', result);
      await new Promise(resolve => setTimeout(resolve, 1000));
//      alert('Shipping settings saved sucsscessfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
  //    alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const debouncedAddress = useDebouncedValue(settings.state , settings.country);
  const {data, isloading, error} = useGetCoordinatesByAddressQuery(debouncedAddress, {
    skip: !debouncedAddress,
  });


  console.log(data , "Location lat long")
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1090px] mx-auto">
    <div className="lg:m-[24px]">
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('domestic')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'domestic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiHome className="inline mr-2" />
            Domestic Shipping
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'international' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiGlobe className="inline mr-2" />
            International Shipping
          </button>
           <button
            onClick={() => setActiveTab('warehouse')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'warehouse' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <House className="inline mr-2" />
            Warehouse Location
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'domestic' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Domestic Shipping Settings</h2>
            
            <div>
              <label htmlFor="nigeriaFlatRate" className="block text-sm font-medium text-gray-700 mb-1">
                Nigeria Flat Rate (₦)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                ₦
                </div>
                <input
                  type="number"
                  id="nigeriaFlatRate"
                  name="nigeriaFlatRate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={settings.nigeriaFlatRate}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                This flat rate will be applied to all orders shipped within Nigeria.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'international' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">International Shipping Settings</h2>
            
            <div>
              <label htmlFor="internationalRate" className="block text-sm font-medium text-gray-700 mb-1">
                Per Kilometer Rate ($)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="internationalRate"
                  name="internationalRate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={settings.internationalRate}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                This rate will be multiplied by the distance to calculate international shipping costs.
              </p>
            </div>
            
            <div>
              <label htmlFor="internationalCap" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Cap Amount ($)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="internationalCap"
                  name="internationalCap"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={settings.internationalCap}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                International shipping costs will never exceed this maximum amount.
              </p>
            </div>




          </div>
        )}


         {activeTab === 'warehouse' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Warehouse Location</h2>
       {/* Address enter */}
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LocateIcon className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={settings.address || ''}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
       
       
            {/* Country Select */}
<div className="relative rounded-md shadow-sm mb-4">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <FiGlobe className="text-gray-400" />
  </div>
  <select
    name="country"
    value={settings.country}
    onChange={handleChange}
    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
  >
    <option value="">Select Country</option>
  {Array.isArray(countriesData?.data) &&
  countriesData?.data.map((country, index) => (
    <option key={index} value={country.name}>{country.name}</option>
))
}

  </select>
</div>

{/* State Select */}
<div className="relative rounded-md shadow-sm mb-4">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <HouseIcon className="text-gray-400" />
  </div>
  <select
    name="state"
    value={settings.state}
    onChange={handleChange}
    disabled={!settings.country}
    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md bg-white disabled:opacity-50"
  >
    <option value="">{settings.country ? 'Select State' : 'Select a country first'}</option>
    {states.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>
</div>
            
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            type='submit'
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <FiSave className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ShippingSettingsPage;