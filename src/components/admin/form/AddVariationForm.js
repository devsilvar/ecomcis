// src/components/ProductForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { FaTrash, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { addProductVariations } from '../../../store/features/product/addProductVariation';

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductVariationForm = ({product_id}) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.addVariation);
  const [variations, setVariations] = useState([
    { size: '', color: '', price: '', stock_quantity: '', image: null, imagePreview: null },
  ]);

  const handleAddVariation = () => {
    setVariations([...variations, { size: '', color: '', price: '', stock_quantity: '', image: null, imagePreview: null }]);
  };

  const handleRemoveVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = variations.slice();
    newVariations[index][field] = value;
    setVariations(newVariations);
  };

  const handleImageChange = async (index, file) => {
    // Convert the file to a base64 string
    const base64Image = await toBase64(file);

    // Create a preview URL for the image
    const imagePreview = URL.createObjectURL(file);

    // Update the state with the base64 image and preview URL
    const newVariations = [...variations];
    newVariations[index] = {
        ...newVariations[index],
        image: base64Image,
        imagePreview: imagePreview,
    };
    
    setVariations(newVariations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all image files are converted to base64 before submitting
    const variationsWithBase64 = await Promise.all(
      variations.map(async (variation) => ({
        ...variation,
        image: variation.image ? await toBase64(variation.image) : null,
      }))
    );

    const payload = { product_id, variations: variationsWithBase64 };

    dispatch(addProductVariations(payload));
  };
  return (
    <form onSubmit={handleSubmit}>

      {variations.map((variation, index) => (
        <div key={index} className='p-3'>
          <h4>Variation {index + 1}</h4>
          <Input 
                topText="Size" 
                name="size" 
                placeholder="XXL" 
                type="text"
                className="mt-[23px]" 
                value={variation.size} 
                onChange={(e) => handleVariationChange(index, 'size', e.target.value)} required
                />
          
          <Input 
                topText="Color" 
                name="color" 
                type="color"
                className="mt-[23px]" 
                value={variation.color} 
                onChange={(e) => handleVariationChange(index, 'color', e.target.value)} required 
                />
          
          <Input 
                topText="Price" 
                name="price" 
                type="number"
                className="mt-[23px]" 
                value={variation.price} 
                onChange={(e) => handleVariationChange(index, 'price', e.target.value)} required
                />
          
          <Input 
                topText="Quantity" 
                name="quantity" 
                type="number"
                className="mt-[23px]" 
                value={variation.stock_quantity} 
                onChange={(e) => handleVariationChange(index, 'stock_quantity', e.target.value)} required 
                />
          
          <div>
          <p className="text-[0.875rem] mb-[10px]">Image</p>
            <div className='flex gap-[15px]'>
                <div class="shrink-0">
                    <img 
                        class="h-16 w-16 object-cover rounded" 
                        src={variation.imagePreview || "https://fakeimg.pl/600x400"} 
                        alt="Product variation" />
                </div>
                <input 
                        topText="Image" 
                        name="image" 
                        type="file"
                        className="mt-[23px] block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        "
                        onChange={(e) => handleImageChange(index, e.target.files[0])} required
                        />
            </div>
          </div>

          <div className="flex justify-between items-center mt-[23px]">
            <button type="button" className='bg-[#8D033E] text-[#DF7DA6] rounded p-3' onClick={() => handleRemoveVariation(index)}> <FaTrash/></button>
            <button type="button" className='bg-[#025107] text-[#B1FFC6] rounded p-3' onClick={handleAddVariation}> <FaPlus/> </button>
        </div>
        </div>
      ))}
            <button type="submit" className="bg-[#4E0240] w-[90%] mx-[auto] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5" disabled={loading}>{ loading ? <ClipLoader size={20} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" /> : 'Submit'}</button>
    </form>
  );
};

export default ProductVariationForm;
