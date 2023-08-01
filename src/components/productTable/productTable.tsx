import React from 'react';
import './ProductTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface Product {
  id: number;
  name: string;
}


export interface Props {
  productData: {
    brands: {
      name: string;
      products: Product[];
    }[];
  };
  onDeleteProduct: (brandName: string, productId: number) => void;
  onEditProduct: (brandName: string, productId: number) => void;
}

const ProductTable: React.FC<Props> = ({ productData, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="main-content">
      {productData.brands.map((brand) => (
        <div key={brand.name} className="product-table">
          <div className="product-brand">
            <h2>{brand.name.toUpperCase()}</h2>
          </div>
          {brand.products.map((product) => (
            <div key={product.id} className="product">
              <span>{product.id}.</span>
              <span>{product.name}</span>
              <span onClick={() => onDeleteProduct(brand.name, product.id)}>
                <i>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: 'red', fontSize: '1.3rem' }}
                  />
                </i>
              </span>
              <span onClick={() => onEditProduct(brand.name, product.id)}>
                <i>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: 'green', fontSize: '1.3rem' }}
                  />
                </i>{' '}
                Edit
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
