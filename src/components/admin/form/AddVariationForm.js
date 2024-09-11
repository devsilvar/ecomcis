import { addSingleVariation } from '../../../store/features/product/addSingleVariation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { FaTrash, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

const ProductVariationForm = ({ product_id, show_skip, productImages }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.addSingleVariation);

  const [colors, setColors] = useState([
    {
      name: "",
      sizes: [{ name: "", quantity: 1 }],
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null); // To store selected image ID
  const [price, setPrice] = useState(0);

  const handleColorChange = (index, field, value) => {
    const newColors = colors?.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    );
    setColors(newColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const newSizes = colors[colorIndex].sizes?.map((size, i) =>
      i === sizeIndex ? { ...size, [field]: value } : size
    );
    const newColors = colors?.map((color, i) =>
      i === colorIndex ? { ...color, sizes: newSizes } : color
    );
    setColors(newColors);
  };

  const addSizeField = (colorIndex) => {
    const newSizes = [...colors[colorIndex].sizes, { name: "", quantity: 1 }];
    const newColors = colors?.map((color, i) =>
      i === colorIndex ? { ...color, sizes: newSizes } : color
    );
    setColors(newColors);
  };

  const addColorField = () => {
    setColors([...colors, { name: "", sizes: [{ name: "", quantity: 1 }] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      product_variant: parseInt(product_id, 10),
      image: selectedImage, // Include selected image ID
      colors: colors,
      price: price,
    };

    dispatch(addSingleVariation(payload));
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <h4>Variation</h4>

        {/* Image Selection */}
        <div className="mb-[23px]">
          <label htmlFor="image_select" className="block mb-2">Select an Image</label>
          <div className="flex gap-3 flex-wrap">
            {productImages?.map((image) => (
              <div key={image.id} className="cursor-pointer" onClick={() => setSelectedImage(image.id)}>
                <img
                  src={image.image_url}
                  alt={`Image ${image.id}`}
                  className={`w-20 h-20 object-cover rounded ${selectedImage === image.id ? 'border-2 border-blue-500' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

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

            {color?.sizes?.map((size, sizeIndex) => (
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
                  min="0"
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
              min="0"
              className="mt-[23px]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
