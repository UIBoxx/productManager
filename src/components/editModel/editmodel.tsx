import React, { useState } from 'react';
import { Product } from '../productTable/productTable';
import './editmodel.css';

interface EditModalProps {
  product: Product;
  onClose: () => void;
  onUpdateProduct: (productId: number, updatedProduct: Partial<Product>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose, onUpdateProduct }) => {
  const [updatedName, setUpdatedName] = useState(product.name);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdateProduct(product.id, { name: updatedName });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className='editForm'>
          <div className='form-field'>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              value={updatedName}
              onChange={handleNameChange}
            />
          </div>
          <div className="edit-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
