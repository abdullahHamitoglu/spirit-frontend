import React, { useState, useContext } from "react";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import { useTranslation } from "react-i18next";
import useCartStore from "@/helpers/cart/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import currencyStore from "@/helpers/Currency/CurrencyStore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { toast } from "react-toastify";
const DetailsWithPrice = ({ item, stickyClass }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const product = item;
  const [price, setPrice] = useState(product.price);
  const { selectedCurrency } = currencyStore();
  // Add the following useState hook
  const [quantity, setQuantity] = useState(1); // Set the initial quantity to 1
  const { t } = useTranslation();
  const { addToCart, getCart } = useCartStore();
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
  const handleAddToCart = () => {
    if (product.variants) {
      if (document.querySelector("input[name=variant]:checked")) {
        addToCart({
          quantity,
          product_id: product.id,
          selected_configurable_option: parseInt(
            document.querySelector("input[name=variant]:checked").value,
          ),
        });
        getCart();
        document.querySelectorAll(".variants .variant").forEach((e) => {
          e.classList.remove("invalid");
        });
      } else {
        toast.warn(t("pleas select variant"));
        document.querySelectorAll(".variants .variant").forEach((e) => {
          e.classList.add("invalid");
        });
      }
    } else {
      addToCart({
        quantity,
        product_id: product.id,
      });
      getCart();
    }
  };
  const handelChangePrice = (price) => {
    setPrice(price);
    document.querySelectorAll(".variants .variant").forEach((e) => {
      e.classList.remove("invalid");
    });
  };
  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>
            {product.special_price * quantity} {selectedCurrency.symbol}
          </del>
          <span>{product.percentage} off</span>
        </h4>
        <h3 className="price">
          {price * quantity} {selectedCurrency.symbol}
        </h3>
        <div className="product-description border-product">
          <span className="instock-cls">
            {product.in_stock ? t("in_stock") : t("out_of_stock")}
          </span>
          <h6 className="product-title">{t("quantity")}</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() => plusQty(product)}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
            {product.variants && (
              <Swiper
                className="variants"
                spaceBetween={15}
                slidesPerView={"auto"}
              >
                {product.variants.map((variant, i) => (
                  <SwiperSlide key={i} className="variant-slide">
                    <label className="variant" htmlFor={variant.sku}>
                      {variant.attribute_option_label}
                      <input
                        hidden
                        id={variant.sku}
                        type="radio"
                        name="variant"
                        value={variant.variant_id}
                        onChange={() => handelChangePrice(variant.price)}
                      />
                    </label>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => handleAddToCart()}
          >
            add to cart
          </a>
          <Link href={`/account/checkout`} className="btn btn-solid">
            buy now
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.short_description}</p>
        </div>
        {/* <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div> */}
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
