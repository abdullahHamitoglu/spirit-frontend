import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");
  const router = useRouter()
  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (item, quantity) => {
    toast.success("Product Added Successfully !");
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}api/v1/customer/cart/add/${item.id}`,
      method: 'POST',
      auth:`Bearer ${localStorage.getItem('token')}`,
      data: {
        quantity,
        product_id: item.id,
      },
    }).then(res => {
      toast.error('added cart')
      console.log(res);
    }).catch((error, errors) => {
      toast.error("error cart");
      console.log(error);
      if (error.response.status == 401) {
        router.push(`/account/login?redirect_url=${router.asPath}`);
      }
    })
    if (index !== -1) {
      cartItems[index] = {
        ...item,
        qty: quantity,
        total: (item.price - (item.price * item.discount) / 100) * quantity,
      };
      setCartItems([...cartItems]);
    } else {
      const product = {
        ...item,
        qty: quantity,
        total: item.price - (item.price * item.discount) / 100,
      };
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e) => e.id !== item.id));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item) => {
    if (item.in_stock) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id);
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: item.price * quantity,
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total: (item.price - (item.price * item.discount) / 100) * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
