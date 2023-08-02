import { useState } from 'react';
import './App.css';
import ProductForm from './components/productForm/productForm';
import ProductTable from './components/productTable/productTable';
import brandsData from './components/data/database.json'; // Assuming you have initial data in the database.json
import EditModal from './components/editModel/editmodel';

interface Product {
  id: number;
  name: string;
  brand: string;
}

function App() {
  const [productData, setProductData] = useState(brandsData);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleAddProduct(brandName: string, productName: string) {
    const brand = productData.brands.find((brand) => brand.name === brandName);
    console.log(brand);

    if (brand) {
      // Create a new product object
      const newProduct: Product = {
        id: brand.products[brand.products.length - 1].id + 1,
        name: productName,
        brand: brandName,
      };

      // Find the brand and update its products array with the new product
      const updatedBrands = productData.brands.map((existingBrand) =>
        existingBrand.name === brandName
          ? { ...existingBrand, products: [...existingBrand.products, newProduct] }
          : existingBrand
      );

      // Update the state with the new data
      setProductData({ ...productData, brands: updatedBrands });
    }
  }

  const handleDeleteProduct = (brandName: string, productId: number): void => {
    // Find the brand with the specified name
    const brand = productData.brands.find((brand) => brand.name === brandName);

    if (brand) {
      // Filter out the product with the specified ID from the products array
      const updatedProducts = brand.products.filter((product) => product.id !== productId);

      // Update the product data
      setProductData((prevData) => ({
        ...prevData,
        brands: prevData.brands.map((brand) =>
          brand.name === brandName ? { ...brand, products: updatedProducts } : brand
        ),
      }));
    }

    console.log(`deleted id: ${productId} and brand: ${brandName}`);
  };

  const handleEditProduct = (brandName: string, productId: number): void => {
    console.log(`Edited id: ${productId} and brand: ${brandName}`);
    const brand = productData.brands.find((brand) => brand.name === brandName);
    if (brand) {
      const product = brand.products.find((product) => product.id === productId);
      if (product) {
        setSelectedProduct({
          id: product.id,
          name: product.name,
          brand: brandName, // Include the 'brand' property here
        });
        setIsEditModalOpen(true);
      }
    }
  };

  const handleUpdateProduct = (productId: number, updatedProduct: Partial<Product>) => {
    // Update the product with the specified ID
    setProductData((prevData) => ({
      ...prevData,
      brands: prevData.brands.map((brand) =>
        brand.name === selectedProduct?.brand
          ? {
              ...brand,
              products: brand.products.map((product) =>
                product.id === productId ? { ...product, ...updatedProduct } : product
              ),
            }
          : brand
      ),
    }));

    setIsEditModalOpen(false);
  };

  function handleCloseModal(): void {
    setIsEditModalOpen(false);
  }

  return (
    <div className="app">
      <div className="title">
        <h2>Manage Product of different brands</h2>
      </div>
      <ProductForm handleAddProduct={handleAddProduct} />
      <ProductTable
        productData={productData}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
      {isEditModalOpen && selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
      <div className="footer">
        Made with <span> &hearts; 
</span> by Prabin Bhatt
      </div>
    </div>
  );
}

export default App;
