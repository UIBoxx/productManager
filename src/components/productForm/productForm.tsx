import React, { useState } from 'react';
import brandsData from '../data/database.json';
import './productForm.css';


interface ProductFormProps {
  handleAddProduct: (brandName: string, productName: string) => void;
}


function ProductForm({handleAddProduct}: ProductFormProps){
 
  const [formData, setFormData] = useState({
    brand: '',
    product: ''
  });

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Handle brand change here if needed
    setFormData((prevFormData) => ({
      ...prevFormData,
      brand: event.target.value
    }));
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle product change here if needed
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: event.target.value
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (formData.brand && formData.product) {
      // Call the onAddProduct function passed from the parent (App) component
      handleAddProduct(formData.brand, formData.product);

      // Clear the form fields after submission
      setFormData({ brand: '', product: '' });
    }
  };

  return (
    <div className="form-container">
      <div className="form-field-wrapper">
        <label htmlFor="brand">Brand:</label><br />
        <select name="brand" id="brand" value={formData.brand} onChange={handleBrandChange}>
          <option value="">Select</option>
          {brandsData.brands.map((brand) => (
        <option key={brand.name} value={brand.name}>
          {brand.name}
        </option>
      ))}
        </select>
      </div>
      <div className="form-field-wrapper">
        <label htmlFor="product">Product:</label><br />
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleProductChange}
        />
      </div>
      <div className="form-field-wrapper">
      <button className='Addbutton' onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
}

export default ProductForm;
