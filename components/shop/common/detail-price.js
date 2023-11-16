import React, { useState, useContext } from "react";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";

import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import { useTranslation } from "react-i18next";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const uniqueColor = [];
  const uniqueSize = [];
  // Add the following useState hook
  const [quantity, setQuantity] = useState(1); // Set the initial quantity to 1
  const { t } = useTranslation();
  // Define the changeQty function
  const changeQty = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  // Define the plusQty function
  const plusQty = () => {
    setQuantity(quantity + 1);
  };

  // Define the minusQty function
  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>
            {product.formatted_special_price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {product.formatted_price}
        </h3>
        {/* {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })} */}
        {changeColorVar === undefined ? (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return <li className={vari.color} key={i} title={vari.color}></li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return <li className={vari.color} key={i} title={vari.color} onClick={() => changeColorVar(i)}></li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
        <div className="product-description border-product">
          {product.variants ? (
            <div>
              {uniqueSize.some((size) => size) ? (
                <>
                  <h6 className="product-title size-text">
                    select size
                    <span>
                      <a href={null} data-toggle="modal" data-target="#sizemodal" onClick={toggle}>
                        size chart
                      </a>
                    </span>
                  </h6>
                  <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                    <ModalBody>
                      <Media src="/assets/images/size-chart.jpg" alt="size" className="img-fluid" />
                    </ModalBody>
                  </Modal>
                  <div className="size-box">
                    <ul>
                      {uniqueSize.map((data, i) => {
                        return (
                          <li key={i}>
                            <a href={null}>{data}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{product.in_stock ? t('in_stock') : t('out_of_stock')}</span>
          <h6 className="product-title">{t('quantity')}</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button type="button" className="btn quantity-left-minus" onClick={minusQty} data-type="minus" data-field="">
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input type="text" name="quantity" value={quantity} onChange={changeQty} className="form-control input-number" />
              <span className="input-group-prepend">
                <button type="button" className="btn quantity-right-plus" onClick={() => plusQty(product)} data-type="plus" data-field="">
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a href={null} className="btn btn-solid" onClick={() => context.addToCart(product, quantity)}>
            add to cart
          </a>
          <Link href={`/page/account/checkout`} className="btn btn-solid" onClick={() => context.addToCart(product, quantity)}>
            buy now
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.short_description}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
