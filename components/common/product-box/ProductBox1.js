import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import MasterProductDetail from "./MasterProductDetail";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../helpers/cart/cartStore";
import currencyStore from "../../../helpers/Currency/CurrencyStore";

const ProductItem = ({ wishListLoading, product, addCart, backImage, des, addWishlist, cartClass, productDetail, addCompare, title }) => {
  // eslint-disable-next-line
  const router = useRouter();
  const { selectedCurrency } = currencyStore();
  const currency = selectedCurrency;
  const { count, increment, decrement } = useCartStore();

  const { t } = useTranslation();
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const onClickHandle = (img) => {
    setImage(img);
  };

  const clickProductDetail = () => {
    router.push('/products/[slug]', `/products/${product.url_key}`);
  };
  const handelAddCart = () => {
    if (product.type == 'simple') {
      addCart()
    } else {
      clickProductDetail()
    }
  };

  useEffect(() => {
    setImage(image ? image : product.images.length > 0 ? product.images[0].original_image_url : "/assets/images/lazy.jpg")
  }, [image]);

  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === true ?
            <>
              <span className="lable3">{t('new')}</span>
            </>
            : ""}
          {product.sale === true ? <span className="lable4">{t('on_sale')}</span> : ""}
        </div>
        <Link className="front" href={`/products/${product.url_key}`}>
          <Media srcSet={image} src="/assets/images/lazy.jpg" className="img-fluid m-auto lazyload blur-up" alt={product.name} />
        </Link>
        {backImage ? (
          product.images[1] === "undefined" ? (
            "false"
          ) : (
            <Link className="back" href={`/products/${product.url_key}`}>
              <Media srcSet={product.images[1].original_image_url} src="/assets/images/lazy.jpg" className="img-fluid m-auto lazyload blur-up" alt={product.name} />
            </Link>
          )
        ) : (
          ""
        )}

        <div className={cartClass}>
          <button className={product.is_item_in_cart ? ' active' : ''} title={t('add_to_cart')} onClick={() => { handelAddCart() }}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <a href={null} title={t('add_to_wishlist')} onClick={addWishlist}>
            <i className={`icon fa fa-heart${wishListLoading ? ' loading' : ''}${product.is_in_wishlist ? ' active' : ''}`} aria-hidden="true"></i>
          </a>
          <a href={null} title={t('quick_view')} onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href={null} title={t('compare')} onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal isOpen={modalCompare} toggle={toggleCompare} size="lg" centered>
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    {product.images.length > 0 ?
                      <Media src={product.images[0].original_image_url} alt="" className="img-fluid" />
                      : ''
                    }
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>{t('item')} <span>{product.name}</span>
                        <span> {t('successfully_added_to_compare')}</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <button className="btn-sm btn-solid" onClick={addCompare}>
                            {t('view_compare_list')}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        {product.images ? (
          <ul className="product-thumb-list">
            {product.images.length > 1 && product.images.map((img, i) => (
              <li className={`grid_thumb_img ${img.original_image_url === image ? "active" : ""}`} key={i}>
                <a href={null} title={t('add_to_wishlist')}>
                  <Media src={img.small_image_url} alt={t('wishlist')} onClick={() => onClickHandle(img.original_image_url)} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail product={product} productDetail={productDetail} currency={currency} uniqueTags={uniqueTags} title={title} des={des} />
      <Modal isOpen={modal} toggle={toggle} className="modal-lg quickview-modal" centered>
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                {product.images.length > 0 ?
                  <Media src={product.images[0].original_image_url} alt="" className="img-fluid" />
                  : ''
                }
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <button type="button" data-dismiss="modal" className="btn-close btn btn-secondary" aria-label="Close" onClick={toggle}></button>
                <h2> {product.title} </h2>
                <h3>
                  {product.formatted_price}
                </h3>
                <div className="border-product">
                  <h6 className="product-title">{t('product_details')}</h6>
                  <p>{product.short_description}</p>
                </div>
                <div className="product-description border-product">
                  {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
                          return (
                            <li key={i}>
                              <a href={null}>{size}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <h6 className="product-title">{t('quantity')}</h6>
                  <div className="qty-box">
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <button type="button" className="btn quantity-left-minus" onClick={decrement} data-type="minus" data-field="">
                          <i className="fa fa-angle-left"></i>
                        </button>
                      </span>
                      <input type="text" name="quantity" value={count} className="form-control input-number" />
                      <span className="input-group-prepend">
                        <button type="button" className="btn quantity-right-plus" onClick={increment} data-type="plus" data-field="">
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-buttons">
                  <button className="btn btn-solid" onClick={() => addCart(product)}>
                    {t('add_to_cart')}
                  </button>
                  <button className="btn btn-solid" onClick={clickProductDetail}>
                    {t('view_detail')}
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
