// src/components/ProductForm.js
import { addSingleVariation } from '../../../store/features/product/addSingleVariation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { FaTrash, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
// import { addProductVariations } from '../../../store/features/product/addProductVariation';




const ProductVariationForm = ({ product_id, show_skip }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.addSingleVariation);

  const [colors, setColors] = useState([
    {
      name: "",
      price: 0,
      sizes: [{ name: "", quantity: 1 }],
    },
  ]);

  const handleColorChange = (index, field, value) => {
    const newColors = colors.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    );
    setColors(newColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const newSizes = colors[colorIndex].sizes.map((size, i) =>
      i === sizeIndex ? { ...size, [field]: value } : size
    );
    const newColors = colors.map((color, i) =>
      i === colorIndex ? { ...color, sizes: newSizes } : color
    );
    setColors(newColors);
  };

  const addSizeField = (colorIndex) => {
    const newSizes = [...colors[colorIndex].sizes, { name: "", quantity: 1 }];
    const newColors = colors.map((color, i) =>
      i === colorIndex ? { ...color, sizes: newSizes } : color
    );
    setColors(newColors);
  };

  const addColorField = () => {
    setColors([...colors, { name: "", price: 0, sizes: [{ name: "", quantity: 1 }] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      product_variant: product_id,
      colors: colors,
    };

    dispatch(addSingleVariation(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <h4>Variation</h4>

        {colors.map((color, colorIndex) => (
          <div key={colorIndex} className="mb-[23px]">
            <Input
              topText={`Color ${colorIndex + 1}`}
              name={`color_${colorIndex}`}
              type="color"
              className="mt-[23px]"
              value={color.name}
              onChange={(e) => handleColorChange(colorIndex, "name", e.target.value)}
              required
            />

            {color.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className="mb-[23px]">
                <Input
                  topText={`Size ${sizeIndex + 1}`}
                  name={`size_${colorIndex}_${sizeIndex}`}
                  placeholder="XXL"
                  type="text"
                  className="mt-[23px]"
                  value={size.name}
                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "name", e.target.value)}
                  required
                />
                <Input
                  topText="Quantity"
                  name={`quantity_${colorIndex}_${sizeIndex}`}
                  type="number"
                  className="mt-[23px]"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "quantity", e.target.value)}
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => addSizeField(colorIndex)}
              className="bg-[#5CB4D4] cursor-pointer py-2 px-4 rounded-[8px] text-[#fff] mb-4"
            >
              Add Another Size
            </button>

            <Input
              topText="Price"
              name={`price_${colorIndex}`}
              type="number"
              className="mt-[23px]"
              value={color.price}
              onChange={(e) => handleColorChange(colorIndex, "price", e.target.value)}
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addColorField}
          className="bg-[#4E0240] py-2 px-4 rounded-[8px] text-[#fff] mb-4"
        >
          Add Another Variation
        </button>
      </div>

      <div className="flex justify-between mb-[50px] mt-[23px] px-5">
        <button type="submit" className="bg-[#4E0240] py-3 px-5 rounded-[8px] text-[#fff]" disabled={loading}>
          {loading ? <ClipLoader size={20} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" /> : "Submit"}
        </button>
        {show_skip ? (
          <Link to="/admin/dashboard" className="border-grey rounded-[8px] py-3 px-5 border-2">
            Skip
          </Link>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default ProductVariationForm;
