import React, { useEffect, useState } from 'react';
import brandsData from '../data/database.json';
import './productForm.css';

interface ProductFormProps {
  handleAddProduct: (brandName: string, productName: string) => void;
}

function ProductForm({ handleAddProduct }: ProductFormProps) {
  const initialFormData = {
    brand: '',
    product: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [customBrand, setCustomBrand] = useState(false);

  useEffect(() => {
    // Load data from local storage if available on component mount
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save form data to local storage whenever it changes
    localStorage.setItem('productFormData', JSON.stringify(formData));
  }, [formData]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    if (selectedBrand === 'custom') {
      setCustomBrand(true);
      setFormData({ ...initialFormData, brand: '' });
    } else {
      setCustomBrand(false);
      setFormData({ ...initialFormData, brand: selectedBrand });
    }
  };

  const handleCustomBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, brand: event.target.value });
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, product: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
      
    if (formData.brand && formData.product) {
      handleAddProduct(formData.brand, formData.product);
      setFormData(initialFormData);
      setCustomBrand(false);
    }
    }catch{
      console.log('Error')
    }
  };

  return (
    <div className="form-container">
      <div className="form-field-wrapper">
        <label htmlFor="brand">Brand:</label><br />
        <select name="brand" id="brand" value={customBrand ? 'custom' : formData.brand} onChange={handleBrandChange}>
          <option value="">Select</option>
          {brandsData.brands.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
          <option value="custom">+add New</option>
        </select>
      </div>
      {customBrand && (
        <div className="form-field-wrapper">
          <label htmlFor="customBrand">New Brand:</label><br />
          <input
            type="text"
            name="customBrand"
            value={formData.brand}
            onChange={handleCustomBrandChange}
          />
        </div>
      )}
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
