import React, { useState } from 'react';
import './productForm.css';
import { Product } from '../productTable/productTable';

interface ProductFormProps {
  handleAddProduct: (brandName: string, productName: string) => void;
    productData: {
      brands: {
        name: string;
        products: Product[];
      }[];
    };
}

function ProductForm({ handleAddProduct,productData }: ProductFormProps) {
  const [formData, setFormData] = useState({
    brand: '',
    product: ''
  });
  const [customBrand, setCustomBrand] = useState(false);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    if (selectedBrand === 'custom') {
      setCustomBrand(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        brand: ''
      }));
    } else {
      setCustomBrand(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        brand: selectedBrand
      }));
    }
  };

  const handleCustomBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brand: event.target.value
    }));
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: event.target.value
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (formData.product && (formData.brand || customBrand)) {
      const brandName = customBrand ? formData.brand : formData.brand;
      handleAddProduct(brandName, formData.product);
      setFormData({ brand: '', product: '' });
      setCustomBrand(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-field-wrapper">
        <label htmlFor="brand">Brand:</label><br />
        <select name="brand" id="brand" value={customBrand ? 'custom' : formData.brand} onChange={handleBrandChange}>
          <option value="">Select</option>
          {productData.brands.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
          <option value="custom">+ Add New Brand</option>
        </select>
      </div>
      {customBrand && (
        <div className="form-field-wrapper">
          <label htmlFor="customBrand">New Brand Name:</label><br />
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
      <div className="btn-field-wrapper">
        <button className='Addbutton' onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
}

export default ProductForm;
