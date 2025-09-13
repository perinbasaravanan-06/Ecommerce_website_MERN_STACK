import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import api from '../../utils/axios';

const AddProduct = ({ onProductAdded }) => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => setImage(e.target.files[0]);
  const changeHandler = (e) =>
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });

  const Add_product = async () => {
    if (!image) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append('product', image);

      // Upload image
      const uploadResp = await api.post('/upload', formData);
      const product = { ...productDetails, image: uploadResp.data.image_url };

      // Add product
      const addResp = await api.post('/api/products/addproduct', product);
      if (addResp.data.success) {
        alert("Product Added Successfully");
        onProductAdded && onProductAdded();
      } else {
        alert("Adding Product Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>PRODUCT TITLE</p>
        <input value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
      </div>

      <div className="addproduct-price">
        <div className='addproduct-itemfield'>
          <p>PRICE</p>
          <input value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Enter old price' />
        </div>
        <div className='addproduct-itemfield'>
          <p>OFFER PRICE</p>
          <input value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Enter new price' />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>PRODUCT CATEGORY</p>
        <select value={productDetails.category} onChange={changeHandler} name="category">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" id="file-input" hidden />
      </div>

      <button onClick={Add_product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default AddProduct;
