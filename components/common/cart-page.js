import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Media, Input } from "reactstrap";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import { useTranslation } from "react-i18next";
import useCartStore from "@/helpers/cart/cartStore";
import ProfileLoader from "../account/profileLoader";
import CartLoader from "../layouts/Bags/common/cartLoader";

const CartPage = () => {
  const { getCart, cartData, removeFromCart, cartLoading, updateQty } = useCartStore();
  const { t } = useTranslation();
  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };


  useEffect(() => {
    getCart()
  }, [])
  return (
    <div>
      {cartData && cartData.items && cartData.items.length > 0 ?
        (
          <section className="cart-section section-b-space">
            <Container>
              <Row>
                <Col sm="12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">{t('image')}</th>
                        <th scope="col">{t('product_name')}</th>
                        <th scope="col">{t('price')}</th>
                        <th scope="col">{t('quantity')}</th>
                        <th scope="col">{t('action')}</th>
                        <th scope="col">{t('total')}</th>
                      </tr>
                    </thead>
                    {cartData.items.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              <Link href={`/products/` + item.product.url_key}>
                                <Media
                                  src={
                                    item.product.base_image
                                      ? item.product.base_image.small_image_url
                                      : item.product.base_image.small_image_url
                                  }
                                  alt={item.product.name}
                                />
                              </Link>
                            </td>
                            <td>
                              <Link href={`/products/` + item.product.url_key}>
                                {item.product.name}
                              </Link>
                              <div className="mobile-cart-content row">
                                <div className="col-xs-3">
                                  <div className="qty-box">
                                    <div className="input-group">
                                      <input
                                        type="number"
                                        name="quantity"
                                        onChange={(e) =>
                                          handleQtyUpdate(item.id, e.target.value)
                                        }
                                        className="form-control input-number"
                                        defaultValue={item.quantity}
                                        style={{
                                          borderColor: quantityError && "red",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {item.product.quantity >= item.product.stock ? t('out_of_stock') : ""}
                                </div>
                                <div className="col-xs-3">
                                  <h2 className="td-color">
                                    {item.product.price}
                                  </h2>
                                </div>
                                <div className="col-xs-3">
                                  <h2 className="td-color">
                                    <a href="#" className="icon">
                                      <i
                                        className="fa fa-times"
                                        onClick={() => removeFromCart(item.id)}
                                      ></i>
                                    </a>
                                  </h2>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h2>
                                {item.product.formatted_price}
                              </h2>
                            </td>
                            <td>
                              <div className="qty-box">
                                <div className="input-group">
                                  <input
                                    type="number"
                                    name="quantity"
                                    onChange={(e) =>
                                      handleQtyUpdate(item, e.target.value)
                                    }
                                    className="form-control input-number"
                                    defaultValue={item.quantity}
                                    style={{
                                      borderColor: quantityError && "red",
                                    }}
                                  />
                                </div>
                              </div>
                              {item.product.quantity >= item.product.stock ? t('out_of_stock') : ""}
                            </td>
                            <td>
                              <i
                                className="fa fa-times"
                                onClick={() => removeFromCart(item.id)}
                              ></i>
                            </td>
                            <td>
                              <h2 className="td-color">

                                {item.formatted_total}
                              </h2>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <table className="table cart-table table-responsive-md">
                    <tfoot>
                      <tr>
                        <td>{t('total_price')} :</td>
                        <td>
                          <h2>
                            {cartData.formatted_grand_total}{" "}
                          </h2>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </Col>
              </Row>
              <Row className="cart-buttons">
                <Col xs="6">
                  <Link href={`/shop/left_sidebar`} className="btn btn-solid">
                    {t('continue_shopping')}
                  </Link>
                </Col>
                <Col xs="6">
                  <Link href={`/page/account/checkout`} className="btn btn-solid">
                    {t('check_out')}
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
        ) :
        (
          <>
            {cartLoading ? <CartLoader className='m-3 d-flex justify-content-center align-content-center align-items-center w-100' /> :
              <section className="cart-section section-b-space">
                <Container>
                  <Row>
                    <Col sm="12">
                      <div>
                        <div className="col-sm-12 empty-cart-cls text-center">
                          <Media
                            src="/assets/images/icon-empty-cart.png"
                            className="img-fluid mb-4 mx-auto"
                            alt=""
                          />
                          <h3>
                            <strong>{t('your_cart_is_empty')}</strong>
                          </h3>
                          <h4>{t('explore_more_shortlist_items')}</h4>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            }
          </>

        )
      }
    </div>

  );
};

export default CartPage;
