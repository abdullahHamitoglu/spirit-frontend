import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import useCartStore from "@/helpers/cart/cartStore";
import Trans from "@/helpers/Trans";

const ProductItem = ({
  product,
  addCart,
  addWishlist,
  addToCompare,
  spanClass,
}) => {
  const { selectedCurrency } = currencyStore();
  const currency = selectedCurrency;

  const router = useRouter();

  const { count, increment, decrement } = useCartStore();
  const [modal, setModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(product.is_in_wishlist);
  const [modalCompare, setModalCompare] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const uniqueTags = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const clickProductDetail = () => {
    router.push(
      `/products/${product.url_key}`,
      undefined,
      { shallow: true }
    );
  };

  const renderStars = () => {
    const starArray = [];
    const averageRating = Math.round(product.reviews.average_rating);

    if (averageRating === 0) {
      return null;
    }
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <i className={i < averageRating ? 'fa fa-star' : 'fa fa-star-o'} key={i}></i>
      );
    }

    return starArray;
  };
  const handelAddCart = () => {
    if (product.type == 'simple') {
      addCart();
    } else {
      clickProductDetail();
    }
  };
  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === "true" ? <span className="lable3">{t("new")}</span> : ""}
          {product.sale === "true" ? (
            <span className="lable4">on_sale</span>
          ) : (
            ""
          )}
        </div>
        <div className="front">
          <a href={null}>
            <Media
              alt=""
              src={product.base_image.original_image_url}
              className="img-fluid blur-up lazyload bg-img"
            />
          </a>
        </div>
        <div className="cart-info cart-wrap">
          <Modal isOpen={modalCompare} toggle={toggleCompare} centered>
            <ModalHeader toggle={toggleCompare}>Quick View</ModalHeader>
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={product.base_image.original_image_url}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        <div className="quick-view-part btn">
          <a
            className="mobile-quick-view"
            href={null}
            data-toggle="modal"
            data-target="#quick-view"
            title="Quick View"
            onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className="product-info">
        <div className="cart-info cart-wrap px-2">
          <a className="btn p-0" href={null} title={Trans('add_to_wishlist')}
            onClick={(e) => {
              setIsInWishlist(!isInWishlist);
              addWishlist();
            }}
          >
            <i className={`fa fa-heart${!isInWishlist ? '-o' : ''}`} aria-hidden="true"></i>
          </a>
          <a className="d-flex align-items-center text-nowrap w-100 justify-content-center text-black ms-2 btn"
            onClick={handelAddCart}> {Trans("add_to_cart")}
          </a>
        </div>

        <Link href={`/products/${product.url_key}`}>
          <div className="rating">
            {renderStars()}
          </div>
          <h6 title={product.name}>{product.name}</h6>
          <h4 className="justify-content-center flex-column">
            {product.formatted_price}
            {product.special_price > 0 &&
              <del>
                <span className="money">
                  {product.formatted_special_price}
                </span>
              </del>
            }
          </h4>
        </Link>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="quickview-modal"
        size="lg"
        centered>
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  src={product.base_image.original_image_url}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right d">
                <h3 className="fs-4"> {product.name} </h3>
                <h3>
                  {product.formatted_price}
                  {product.special_price > 0 &&
                    <del>
                      <span className="money">
                        {product.formatted_special_price}
                      </span>
                    </del>
                  }
                </h3>
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{product.short_description}</p>
                </div>
                <div className="product-buttons">
                  <button
                    className="btn btn-solid"
                    onClick={() => handelAddCart(product, count)}>
                    add to cart
                  </button>
                  <button
                    className="btn btn-solid"
                    onClick={clickProductDetail}>
                    View detail
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductItem;
