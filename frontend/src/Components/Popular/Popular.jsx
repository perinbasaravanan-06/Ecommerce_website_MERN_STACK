import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Popular.css';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
  const [products, setProducts] = useState([]);
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    axios.get(`${backendUrl}/api/products/popularinwomen`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, [backendUrl]);

  return (
    <div className="popular">
      <h1>Popular in Women’s</h1>
      <hr />
      <div className="popular-item">
        {products.length > 0 ? (
          products.map((item) => (
            <div className="popular-card" key={item._id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p className="price">${item.new_price}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
