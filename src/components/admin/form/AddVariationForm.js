// src/components/ProductForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { FaTrash, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
// import { addProductVariations } from '../../../store/features/product/addProductVariation';
import { addSingleVariation } from '../../../store/features/product/addSingleVariation';

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductVariationForm = ({product_id, show_skip}) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.addSingleVariation);

  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  

  const handleFileChange = (event, setFileFunc, setImageUrlFunc) => {
    const uploadedFile = event.target.files[0];
    setFileFunc(uploadedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrlFunc(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("quantity", quantity);
    formData.append("image", file);
    formData.append("product_variant", product_id);


    dispatch(addSingleVariation(formData));
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className='p-3'>
          <h4>Variation</h4>
          <Input 
                topText="Size" 
                name="size" 
                placeholder="XXL" 
                type="text"
                className="mt-[23px]" 
                value={size} 
                onChange={(e) => setSize(e.target.value)} required
                />
          
          <Input 
                topText="Color" 
                name="color" 
                type="color"
                className="mt-[23px]" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} required 
                />
          
          <Input 
                topText="Price" 
                name="price" 
                type="number"
                className="mt-[23px]" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} required
                />
          
          <Input 
                topText="Quantity" 
                name="quantity" 
                type="number"
                className="mt-[23px]" 
                value={quantity} 
                onChange={(e) => setQuantity( e.target.value)} required 
                />
          
          <div>
          <p className="text-[0.875rem] mb-[10px]">Image</p>
            <div className='flex gap-[15px]'>
                <div class="shrink-0">
                    <img 
                        class="h-16 w-16 object-cover rounded" 
                        src={imageUrl || "https://fakeimg.pl/600x400"} 
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
                        onChange={(e) => handleFileChange(e, setFile, setImageUrl)}
                        />
            </div>
          </div>

        </div>
          <div className='flex justify-between mb-[50px] mt-[23px] px-5'>
            <button type="submit" className="bg-[#4E0240] py-3 px-5 rounded-[8px] text-[#fff]" disabled={loading}>{ loading ? <ClipLoader size={20} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" /> : 'Submit'}</button>
            {show_skip ? <Link to="/admin/dashboard" className='border-grey rounded-[8px] py-3 px-5 border-2'>Skip</Link > : ''}
          </div>
    </form>
  );
};

export default ProductVariationForm;
