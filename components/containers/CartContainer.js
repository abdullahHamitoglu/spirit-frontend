import React, { useContext, Fragment, useEffect } from "react";
import Link from "next/link";
import CartHeader from "../headers/common/cart-header";
import { Media } from "reactstrap";
import currencyStore from "../../helpers/Currency/CurrencyStore";
import useCartStore from "../../helpers/cart/cartStore";

const CartContainer = ({ icon }) => {
  const { selectedCurrency }  = currencyStore();
  const {getCart,cartData , cartLoading } = useCartStore();

  useEffect(()=>{
    getCart()
  },[]);
  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartData && cartData.items_count > 0 ? cartData.items_count : '0'}</div>
        <Link href={`/account/cart`}>
          <div href={null}>
            <Media src={icon} className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        <ul className="show-div shopping-cart">
          {cartData && cartData.items && cartData.items.map((item, index) => (
            <CartHeader key={index} item={item} total={item.formatted_total} />
          ))}
          {cartData && cartData.items && cartData.items.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                      {cartData.formatted_sub_total}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/account/cart`}>
                    {/* <a> */}
                    view cart
                    {/* </a> */}
                  </Link>
                  <Link href={`/account/checkout`} className="checkout">
                    {/* <a > */}
                    checkout
                    {/* </a> */}
                  </Link>
                </div>
              </li>
            </div>
          ) : (
            <li>
              <h5>Your cart is currently empty.</h5>
            </li>
          )}
        </ul>
      </li>
    </Fragment>
  );
};

export default CartContainer;
