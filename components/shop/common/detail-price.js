import React, { useState, useContext } from "react";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader, Media, Input, Badge } from "reactstrap";
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
import Trans from "@/helpers/Trans";
import { useRouter } from "next/router";
const DetailsWithPrice = ({ item, stickyClass }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [product, setProduct] = useState(item);
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
  const { locale } = useRouter()
  const handleAddToCart = () => {
    if (product.variants) {
      if (document.querySelector("input[name=variant]:checked")) {
        addToCart(locale, {
          quantity,
          product_id: product.id,
          selected_configurable_option: parseInt(
            document.querySelector("input[name=variant]:checked").value,
          ),
        });
        getCart(locale, selectedCurrency.code);
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
      addToCart(locale, {
        quantity,
        product_id: product.id,
      });
      getCart(locale, selectedCurrency.code);
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

        {product.label &&
          <>
            <Badge
              color="black"
              pill
              className="fs-6 mb-2"
            >
              {product.label}
            </Badge><br />
          </>
        }
        <Link className="h6 mb-5" href={`/brands/${product.brand.replace(' ', '-').toLowerCase()}`}>{product.brand}</Link>
        <h1 className="h3"> {product.name} </h1>
        <Link className="h6 mb-5" href={`/categories/${product.category_slug}`}>{product.category}</Link>
        <h6>
          {Trans('model_no')} : {product.sku}
          <span className="opacity-25 fw-bold fs-5"> | </span>
          {product.reviews.total &&
            <a href="#reviews" className="text-black" onClick={() => document.querySelector('#reviews a').click()}>
              <span className="text-warning">{`${product.reviews.average_rating} `} </span>
              <i className='fa fa-star text-warning'></i>
              {` (${product.reviews.total})`}
            </a>
          }
        </h6>
        {parseFloat(product.special_price) > 0 ?
          <>
            <h4>
              <del>
                {product.formatted_price}
              </del>
              <span>{product.percentage} {t('off')}</span>
            </h4>
            <h3 className="price">
              {product.formatted_special_price}
            </h3>
          </> :
          <h3 className="price">
            {product.formatted_price}
          </h3>
        }
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
            {t('add_to_cart')}
          </a>
          <Link href={`/account/checkout`} className="btn btn-solid">
            {t('buy_now')}
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">{t('product_details')}</h6>
          <p>{product.short_description}</p>
        </div>
        {/* <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div> */}
        {product.reminder &&
          <div className="border-product">
            <h6 className="product-title">{t('time_reminder')}</h6>
            <CountdownComponent time={product.reminder} />
          </div>
        }
      </div>
    </>
  );
};

export default DetailsWithPrice;
