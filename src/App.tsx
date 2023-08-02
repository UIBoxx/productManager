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

interface Brand {
  name: string;
  products: Product[];
}

function App() {
  const [productData, setProductData] = useState(brandsData);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  
  // function handleAddProduct(brandName: string, productName: string) {
  //   const brand = productData.brands.find((brand) => brand.name === brandName);

  //   if (brand) {
  //     // Create a new product object
  //     const newProduct: Product = {
  //       id: brand.products[brand.products.length - 1].id + 1,
  //       name: productName,
  //       brand: brandName,
  //     };

  //     // Find the brand and update its products array with the new product
  //     const updatedBrands = productData.brands.map((existingBrand) =>
  //       existingBrand.name === brandName
  //         ? { ...existingBrand, products: [...existingBrand.products, newProduct] }
  //         : existingBrand
  //     );

  //     // Update the state with the new data
  //     setProductData({ ...productData, brands: updatedBrands });
  //   }
  // }

  function handleAddProduct(brandName: string, productName: string) {
    console.log(brandsData);
    // Check if the brand already exists
    const existingBrand = productData.brands.find((brand) => brand.name === brandName);
  
    try{
      if (existingBrand) {
        // Brand already exists, proceed to add the product to the existing brand
        const newProduct: Product = {
          id: existingBrand.products[existingBrand.products.length - 1].id + 1,
          name: productName,
          brand: brandName,
        };
    
        const updatedBrands = productData.brands.map((brand) =>
          brand.name === brandName ? { ...brand, products: [...brand.products, newProduct] } : brand
        );
    
        setProductData({ ...productData, brands: updatedBrands });
      } else {
  
        // Brand does not exist, create a new brand and a new database
        const newBrand: Brand = {
          name: brandName,
          products: [
            {
              id: 1, // Assuming this is the first product for the new brand
              name: productName,
              brand: brandName,
            },
          ],
        };
    
        const updatedBrands = [...productData.brands, newBrand];
    
        setProductData({ ...productData, brands: updatedBrands });
      }
    }catch{
      console.error();
      console.log('Error is got');
      
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
