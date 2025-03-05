import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);
    
    const [productDetails,setproductDetails] = useState({
        name : "",
        image : "",
        category : "women",
        new_price : "",
        old_price : ""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setproductDetails({...productDetails,[e.target.name] : e.target.value})
    }

    const Add_product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method : 'POST',
            headers :{
                Accept : 'application/json',
            },
            body : formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData = data});
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method : 'POST',
                headers:{
                    Accept : 'application/json',
                    'content-Type' : 'application/json',
                },
                body :JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added Successfully"):alert("Adding Product Failed")
            })
        }

    }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>PRODUCT TITLE</p>
            <input value = {productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className='addproduct-itemfield'>
                <p>PRICE</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Enter old price' />
            </div>
            <div className='addproduct-itemfield'>
                <p>OFFER PRICE</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Enter old price' />
            </div>
        </div>
        <div className="addproduct-itemfiled">
            <p>PRODUCT CATEGORY</p>
            <select value={productDetails.category} onChange={changeHandler}name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfiled">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumbnail-img' />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={()=>{Add_product()}}className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct