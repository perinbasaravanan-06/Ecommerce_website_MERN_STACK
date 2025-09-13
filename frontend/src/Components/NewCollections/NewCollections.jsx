import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./NewCollections.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const { backendUrl } = useContext(ShopContext); // centralized backend URL

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products/newcollections`);
        setNewCollection(response.data);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };

    fetchNewCollections();
  }, [backendUrl]);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
