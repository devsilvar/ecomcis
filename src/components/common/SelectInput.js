import React, { useState } from 'react';

const CustomDropdown = ({
  data,
  labelKey = 'name',
  valueKey = 'id',
  placeholder = 'Select...',
  onSelect,
}) => {
  // State to manage the selected value and dropdown visibility
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle item selection
  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Get label for the selected value
  const getLabel = () => {
    if (!selectedValue) return placeholder;
    const selectedItem = data.find((item) => item[valueKey] === selectedValue);
    return selectedItem ? selectedItem[labelKey] : placeholder;
  };

  return (
    <div className="relative inline-block">
      {/* Selected value display */}
      <div
        className="border border-gray-300 px-4 py-2 cursor-pointer bg-white z-100 w-[200px]"
        onClick={toggleDropdown}
      >
        {getLabel()}
      </div>

      {/* Dropdown list */}
      {isDropdownOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-red border border-gray-300 shadow-md  z-1000">
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect('')}
          >
            {placeholder}
          </li>
          {data.map((item) => (
            <li
              key={item[valueKey]}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item[valueKey])}
            >
              {item[labelKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
