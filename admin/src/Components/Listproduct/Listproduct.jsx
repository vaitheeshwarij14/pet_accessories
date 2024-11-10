import React, { useEffect, useState } from 'react';
import './Listproduct.css';

const Listproduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null); 
  const [editProductDetails, setEditProductDetails] = useState({}); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete the product?");
    
    if (confirmDeletion) {
      try {
        await fetch('http://localhost:5000/removeproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), 
        });
        await fetchInfo(); 
      } catch (error) {
        console.error('Error removing product:', error);
      }
    } else {
      console.log("Product deletion canceled.");
    }
  };
  

  const updateProduct = async (productId) => {
    try {
      const productDetails = editProductDetails[productId]; 
      const updatedProductData = {
        id: productId, 
        name: productDetails.name,
        
        category: productDetails.category || 'defaultCategory',
      };
      await fetch('http://localhost:5000/updateproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData), 
      });
      await fetchInfo();
      setEditingProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditChange = (e, productId) => {
    const { name, value } = e.target;
    setEditProductDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: {
        ...prevDetails[productId],
        [name]: value,
      },
    }));
  };

  const startEditing = (productId, product) => {
    setEditingProductId(productId);
    setEditProductDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: product,
    }));
  };
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listproduct">
      <div className="search-container">
        <input
          type="text"
          placeholder="search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>

      <div className="listproduct-format">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Update</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main">
                <img
                  src={product.image}
                  alt={product.name}
                  className="listproduct-img"
                />
                {editingProductId === product._id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editProductDetails[product._id]?.name || ''} 
                      onChange={(e) => handleEditChange(e, product._id)}
                    />
                    <input
                      type="text"
                      
                      value={editProductDetails[product._id]?.pricePerKg || ''} 
                      onChange={(e) => handleEditChange(e, product._id)}
                    />
                    <select
                      name="category"
                      value={
                        editProductDetails[product._id]?.category ||
                        'defaultCategory'
                      }
                      onChange={(e) => handleEditChange(e, product._id)}
                    >
                      <option value="Dogs">Dogs</option>
                      <option value="Cats">Cats</option>
                      <option value="Birds">Birds</option>
                      <option value="Others">Others</option>
                    </select>
                    <button
                      onClick={() => updateProduct(product._id)}
                      className="listproduct-btn"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p>{product.name}</p>
                    
                    <p>{product.category}</p>
                    <button
                      onClick={() => startEditing(product._id, product)}
                      className="listproduct-btn"
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={() => removeProduct(product._id)}
                  className="listproduct-btn"
                >
                  Remove
                </button>
              </div>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p>No products found</p> 
        )}
      </div>
    </div>
  );
};

export default Listproduct;
