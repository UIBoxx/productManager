import './productTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface Product {
  id: number;
  name: string;
}

interface Props {
  productData: {
    brands: {
      name: string;
      products: Product[];
    }[];
  };
  onDeleteProduct: (brandName: string, productId: number) => void;
  onEditProduct: (brandName: string, productId: number) => void;
}

function ProductTable({ productData, onDeleteProduct, onEditProduct }: Props) {
  const sortProductsAlphabetically = (products: Product[]) => {
    return products.slice().sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="main-content">
      {productData.brands.map((brand) => {
        const sortedProducts = sortProductsAlphabetically(brand.products);

        return (
          <div key={brand.name} className="product-table">
            <div className="product-brand">
              <h2>{brand.name.toUpperCase()}</h2>
            </div>
            {sortedProducts.length === 0 ? (
              <div className="no-products-message">No products available</div>
            ) : (
              sortedProducts.map((product, index) => (
                <div key={product.id} className="product">
                  <span>{index + 1}.</span>
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
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductTable;
