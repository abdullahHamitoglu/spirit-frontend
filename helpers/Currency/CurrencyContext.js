// CurrencyContext.js

import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer } from "react";

const CurrencyContext = createContext();

const initialCurrencyState = {
  selectedCurrency: 'USD',
  currencies: [], // Initialize currencies array
};

const currencyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.currency,
      };
    case 'SET_CURRENCIES':
      return {
        ...state,
        currencies: action.currencies,
      };
    default:
      return state;
  }
};

function CurrencyProvider({ children }) {
  const [state, dispatch] = useReducer(currencyReducer, initialCurrencyState);
  const {locale} = useRouter();
  const setCurrency = (currency) => {
    // Update the selectedCurrency in both state and local storage
    localStorage.setItem('selectedCurrency', currency);
    dispatch({ type: 'SET_CURRENCY', currency });
  };

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}api/v1/currencies?locale=${locale.slice(0, 2)}`);
      dispatch({ type: 'SET_CURRENCIES', currencies: response.data });
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  };

  useEffect(() => {
    // Check local storage for a saved selected currency on page load
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      dispatch({ type: 'SET_CURRENCY', currency: savedCurrency });
    }
    
    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider value={{ state, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export { CurrencyContext, CurrencyProvider };
