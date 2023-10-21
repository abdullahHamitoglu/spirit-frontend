import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CatalogContext = createContext();

function CatalogProvider({ children }) {
  const { locale } = useRouter();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  // const [countries, setCountries] = useState({});
  const [page, setPage] = useState(1); // Initialize the page to 1

  const getMoreProducts = async () => {
    
  };
  // const getCountries = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.API_URL}api/v1/countries`
  //     );
  //     if (response.data.data) {
  //       // Append the new products to the existing products array
  //       setCountries(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error('get more products failed:', error);
  //   }
  // };


  // useEffect(() => {
  //   getCountries();
  // }, [countries]);
  
  useEffect(() => {
    getMoreProducts();
  }, []); // Run this effect once on initial load

  return (
    <CatalogContext.Provider value={{ getMoreProducts, products }}>
      {children}
    </CatalogContext.Provider>
  );
}

export { CatalogContext, CatalogProvider };
