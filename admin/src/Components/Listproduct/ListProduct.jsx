import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import api from "../../utils/axios";

const ListProduct = ({ refreshTrigger }) => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const { data } = await api.get('/api/products/allproducts');
      setAllProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => { 
    fetchInfo(); 
  }, [refreshTrigger]);

  const remove_product = async (id) => {
    try {
      await api.post('/api/products/removeproduct', { id });
      fetchInfo();
    } catch (error) {
      console.error(error);
      alert("Failed to remove product");
    }
  };

  return (
    <div className="list-product">
      <h1>ALL PRODUCTS LIST</h1>
      <div className="listproduct-format-main">
        <p>PRODUCTS</p><p>TITLE</p><p>OLD PRICE</p><p>NEW PRICE</p><p>CATEGORY</p><p>REMOVE</p>
      </div>

      <div className="list-product-allproduct">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => remove_product(product.id)} className="listproduct-remove-icon" src={cross_icon} alt="" />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
