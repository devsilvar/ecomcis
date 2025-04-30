import { useEffect } from 'react';
import { addSingleVariation } from '../../../store/features/product/addSingleVariation';
import { updateVariation } from '../../../store/features/product/updateVariations';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';

import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

const ProductVariationForm = ({ product_id, show_skip, productImages=[] , updateData ,  requestState }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addSingleVariation);
  const {data} = useSelector((state) => state.getProduct)
  const [colors, setColors] = useState([
    {
      name: "",
      sizes: [{ name: "", quantity: 1 }],
      
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(1); // To store selected image ID
   const [price, setPrice] = useState(0);


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
    // Remove 'price' from each color
  
    const payload = {
      product_variant: parseInt(product_id, 10),
      image: selectedImage, 
      // Include selected image ID
      colors: colors,
      price: price, 
    };
  console.log(payload, "payload")
    if(requestState === "update"){
 
      dispatch(updateVariation({id: updateData.id, data: payload}));
   
   }else if(requestState === "add"){

     dispatch(addSingleVariation(payload));
   }
     
    console.log(payload, "payload")
     console.log({id: data.id, data: payload})
};

// const handleUpdate = (e) =>{
//     e.preventDefault();
//     const payload = {
//       product_variant: parseInt(product_id, 10),
//       image: selectedImage, 
//       // Include selected image ID
//       colors: colors,
//       price: price,
//     };
// } 


  // const editColorNameById = (colorId, newName) => {
  //   setColors(prevColors =>
  //     prevColors.map(color =>
  //       color.id === colorId ? { ...color, name: newName } : color
  //     )
  //   );
  // };
  

//     useEffect(() =>{
//         console.log(updateData)
//         if(updateData){
//           handleColorChange(updateData?.colors[0]?.id, "name", updateData?.colors[0]?.name)
//           // setColors(prevColors =>
//           //   prevColors.map((color, idx) =>
//           //     idx === updateData.colors[0]?.id ? { ...color, name: updateData.colors[0]?.name } : color
//           //   )
//           // );
// //          handleColorChange(updateData?.colors[0]?.id, "name", updateData?.colors[0]?.name)
//           // handleSizeChange(colorIndex, sizeIndex, "name", updateData?.size)
//           // handleSizeChange(colorIndex, sizeIndex, "quantity", updateData?.quantity)
//            setPrice(updateData?.price)
//             // setName(data.name)
//             // setDesc(data?.desc)
//             // setPrice(data?.price)
//             // setImageUrl(data?.images)
//             // setQuantity(data?.quantity)
//         }
//     }, [updateData])


// useEffect(() => {

//   if (updateData && requestState === "update") {
//     const sanitizedColors = updateData.colors?.map(color => ({
//       name: color.name,
//       sizes: color.sizes.map(size => ({
//         name: size.name,
//         quantity: size.quantity,
//       })),
//     }));

//     if (sanitizedColors && sanitizedColors.length > 0) {
//       setColors(sanitizedColors);
//     }

//     if (updateData?.price) {
//       setPrice(Number(updateData.price));
//     }

//     if (updateData?.image) {
//       setSelectedImage(updateData.image);
//     }
//   }

//   // ✅ Cleanup function to reset everything back
//   return () => {
//     setColors([
//       {
//         name: "",
//         sizes: [{ name: "", quantity: 1 }],
//       },
//     ]);
//     setPrice(0);
//     setSelectedImage(1);  // Or whatever default image ID you want
//   };
// }, [updateData]);


// useEffect(() => {
//   if (updateData && requestState === "update") {
//     const sanitizedColors = updateData.colors?.map(color => ({
//       name: color.name,
//       sizes: color.sizes.map(size => ({
//         name: size.name,
//         quantity: size.quantity,
//       })),
//     }));

//     if (sanitizedColors && sanitizedColors.length > 0) {
//       setColors(sanitizedColors);
//     }

//     setPrice(Number(updateData.price || 0));
//     setSelectedImage(updateData.image || productImages?.[0]?.id || 1); 
//   }

//   return () => {
//     setColors([
//       {
//         name: "",
//         sizes: [{ name: "", quantity: 1 }],
//       },
//     ]);
//     setPrice(0);
//     setSelectedImage(1);
//   };
// }, [updateData, productImages]);


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
    setSelectedImage(1);
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
        <button type="submit" className="bg-[#4E0240] py-3 px-5 rounded-[8px] text-[#fff]" disabled={loading}>
          {loading ? <ClipLoader size={20} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" /> : (requestState === "update" ? "Update" :  "Submit" ) }
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
