import React, { useContext, Fragment } from "react";
import Link from "next/link";
import CartHeader from "../headers/common/cart-header";
import CartContext from "../../helpers/cart";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import currencyStore from "@/helpers/Currency/CurrencyStore";

const CartContainer = ({ icon }) => {
  const context = useContext(CartContext);
  const { selectedCurrency }  = currencyStore();
  const symbol = selectedCurrency.symbol ;
  const cartList = context.state;
  const total = context.cartTotal;

  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartList.length}</div>
        <Link href={`/page/account/cart`}>
          <div href={null}>
            <Media src={icon} className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        <ul className="show-div shopping-cart">
          {cartList.map((item, index) => (
            <CartHeader key={index} item={item} total={total} symbol={symbol} />
          ))}
          {cartList.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                      {symbol}
                      {total}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/page/account/cart`}>
                    {/* <a> */}
                    view cart
                    {/* </a> */}
                  </Link>
                  <Link href={`/page/account/checkout`} className="checkout">
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
