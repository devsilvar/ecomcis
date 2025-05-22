import { useEffect } from 'react';
import { addSingleVariation } from '../../../store/features/product/addSingleVariation';
import { updateVariation } from '../../../store/features/product/updateVariations';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';

import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

function findMatchingVariation(payload, product) {
  const targetSizeName = payload.colors[0]?.sizes[0]?.name;

  if (!targetSizeName || !Array.isArray(product.variations)) {
      return null;
  }

  for (const variation of product.variations) {
      for (const color of variation.colors || []) {
          for (const size of color.sizes || []) {
              if (size.name === targetSizeName) {
                  return variation;
              }
          }
      }
  }

  return null; // No matching variation found
}

// function findMatchingVariation(payload, product) {
//   const newColor = payload.colors[0];
//   const newSize = newColor?.sizes[0];
//   const newColorName = newColor?.name;
//   const newSizeName = newSize?.name;

//   if (!newSizeName || !newColorName || !Array.isArray(product.variations)) {
//     return null;
//   }

//   for (const variation of product.variations) {
//     for (const color of variation.colors || []) {
//       if (color.name === newColorName) {
//         for (const size of color.sizes || []) {
//           if (size.name === newSizeName) {
//             return variation; // Match on both color and size
//           }
//         }
//       }
//     }
//   }

//   return null; // No matching variation found
// }

const ProductVariationForm = ({variationId,handleDelete, product_id, show_skip, productImages=[] , updateData ,  requestState }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addSingleVariation);
  const { loading:variationloading, data:variationData, error } = useSelector((state) => state.updateVariation);
  const {data} = useSelector((state) => state.getProduct)
  const [colors, setColors] = useState([
    {
      name: "#000000",
      sizes: [{ name: "", quantity: 1 }],
      
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null); // To store selected image ID
   const [price, setPrice] = useState(0);

   useEffect(() => {
    
     console.log(colors, "colors")
   })
   

  useEffect(() => {
    if (!updateData && productImages && productImages.length > 0) {
      setSelectedImage(productImages[0].id); // Only set default if no update data
    }
  }, [productImages, updateData]);
  

  console.log(updateData, "updateData")
  console.log(productImages, "productImages")
console.log(data, "data")

  const handleColorChange = (index, field, value) => {
   
    const newColors = colors?.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    );
    console.log(newColors, "newColors")
    setColors(newColors);
  };
  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const newSizes = colors[colorIndex].sizes?.map((size, i) =>
      i === sizeIndex ? { ...size, [field]: value } : size
    );
    const newColors = colors?.map((color, i) =>
      i === colorIndex ? { ...color,name: color.name || "#000000", sizes: newSizes } : color
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
    // Remove 'price' from each color
  
    const payload = {
      product_variant: parseInt(product_id, 10),
      image: selectedImage, 
      // Include selected image ID
      colors: colors,
      price: price, 
    };
  console.log(payload, "payload")

let res = findMatchingVariation(payload, data)

if(requestState === "update"){
  variationId && handleDelete(variationId)
  dispatch(addSingleVariation(payload));
} else{
  if(res?.id){
    handleDelete(res.id)
  }
  dispatch(addSingleVariation(payload));
   }     
    // console.log(payload, "payload")
    // console.log(variationData)
    //  console.log({id: updateData.id, data: payload})
};

useEffect(() => {
  if (updateData && requestState === "update") {
    const sanitizedColors = updateData.colors?.map(color => ({
      name: color.name,
      sizes: color.sizes.map(size => ({
        name: size.name,
        quantity: size.quantity,
      })),
    }));

    if (sanitizedColors && sanitizedColors.length > 0) {
      setColors(sanitizedColors);
    }


    //update price
// setColors(prevColors => {
//   return prevColors.map((color, index) => {
//     if (index === 0) { // Assuming you want to update the first color's price
//       return { ...color, price: updateData.price };
//     }
//     return color;
//   });
// })

setPrice(Number(updateData.price || 0));
    // setPrice(Number(updateData.price || 0));

    if (updateData.image && productImages.length > 0) {
      const matchedImage = productImages.find(img => img.image_url === updateData.image);
      if (matchedImage) {
        setSelectedImage(matchedImage.id);
      } else {
        setSelectedImage(productImages?.[0]?.id || 1);
      }
    } else {
      setSelectedImage(productImages?.[0]?.id || 1);
    }
  }

  return () => {
    setColors([
      {
        name: "",
        sizes: [{ name: "", quantity: 1 }],
      },
    ]);
     setPrice(0);
    setSelectedImage(null);
  };
}, [updateData, productImages]);

console.log(updateData)

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <h4>Variation</h4>

        {/* Image Selection */}
        <div className="mb-[23px]">
          <label htmlFor="image_select" className="block mb-2">Select an Image</label>
          <div className="flex gap-3 flex-wrap">
            {console.log(selectedImage , "selected image")}
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
        >Add Another Variation 
        </button>
      </div>

      <div className="flex justify-between mb-[50px] mt-[23px] px-5">
        <button type="submit" className="bg-[#4E0240] disabled:bg-gray-400 py-3 px-5 rounded-[8px] text-[#fff]" disabled={loading || selectedImage == null}>
          {loading || variationloading ? <ClipLoader size={20} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" /> : (requestState === "update" ? "Update" :  "Submit" ) }
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
