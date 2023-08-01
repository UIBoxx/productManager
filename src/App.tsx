import { useState } from 'react';
import './App.css';
import ProductForm from './components/productForm/productForm';
import ProductTable from './components/productTable/productTable';
import brandsData from './components/data/database.json'; // Assuming you have initial data in the database.json

interface Product {
  id: number;
  name: string;
  brand : string;
}
function App() {
  const [productData, setProductData] = useState(brandsData);


  const handleAddProduct = (brandName: string, productName: string): void => {
    const brand = productData.brands.find((brand) => brand.name === brandName);
    

    
    if (brand) {
      // Create a new product object
      const newProduct: Product = {
        id: brand.products.length+1,
        name: productName,
        brand: brandName,
      };

      // Find the brand and update its products array with the new product
      const updatedBrands = productData.brands.map((existingBrand) =>
        existingBrand.name === brandName ? { ...existingBrand, products: [...existingBrand.products, newProduct] } : existingBrand
      );

      // Update the state with the new data
      setProductData({ ...productData, brands: updatedBrands });
    }
  };

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
  };
  


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
    </div>
  );
}

export default App;