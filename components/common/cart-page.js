import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Media, Input, Spinner, InputGroup, Label, Form, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import CartLoader from "../layouts/Bags/common/cartLoader";
import useCartStore from "../../helpers/cart/cartStore";
import { useFormik } from 'formik';
import { useRouter } from "next/router";

const CartPage = () => {
  const { getCart, cartData, removeFromCart, cartLoading, updateQty, applyCoupon, removeCoupon } = useCartStore();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const handleQtyUpdate = (id, quantity) => {
    if (quantity >= 1) {
      updateQty(id, quantity, locale);
    }
  };

  const [loadQ, setLoadQ] = useState(false)

  const [removing, setRemoving] = useState(false)


  // Define the plusQty function
  const plusQty = async (id, q) => {
    setLoadQ(true);
    await updateQty(id, q + 1, locale);
    setLoadQ(false);
  };

  // Define the minusQty function
  const minusQty = async (id, q) => {
    if (q > 1) {
      setLoadQ(true)
      await updateQty(id, q - 1, locale);
      setLoadQ(false)
    }
  };
  const handleRemove = async (id) => {
    setRemoving(true);
    await removeFromCart(locale, id);
    setRemoving(false);
    document.getElementById(`cart-item-${id}`).remove();
  }
  useEffect(() => {
    getCart(locale)
  }, []);
  const [validateCode, setValidateCode] = useState(false)
  const formik = useFormik({
    initialValues: {
      code: cartData && cartData.coupon,
    },
    onSubmit: async (values) => {
      setValidateCode(true)
      await applyCoupon(locale, values)
      setValidateCode(false)
      console.log(values);
    },
  });
  return (
    <>
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
                        <tbody key={index} id={`cart-item-${item.id}`}>
                          <tr>
                            <td>
                              <Link href={`/products/` + item.product.url_key}>
                                <Media
                                  src={
                                    item.product.base_image
                                      ? item.product.base_image.large_image_url
                                      : item.product.base_image.large_image_url
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
                                    <div className="input-group"><input
                                      type="number"
                                      name="quantity"
                                      min={'1'}
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQtyUpdate(item.id, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue={item.quantity}
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
                                    <Button color="danger" className="icon">
                                      {removing ? <Spinner size='sm' /> :
                                        <i
                                          className="fa fa-times"
                                          onClick={() => handleRemove(item.id)}
                                        ></i>}
                                    </Button>
                                  </h2>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h2>
                                {item.formatted_price}
                              </h2>
                            </td>
                            <td>
                              <div className="qty-box">
                                <div className="input-group">
                                  {loadQ == true ? <Spinner size='sm' color="black" /> :
                                    <>
                                      <span className="input-group-prepend">
                                        <button
                                          type="button"
                                          className="btn quantity-left-minus"
                                          onClick={() => minusQty(item.id, item.quantity)}
                                          data-type="minus"
                                          data-field=""
                                        >
                                          <i className="fa fa-angle-left"></i>
                                        </button>
                                      </span>

                                      <Input
                                        type="text"
                                        name="quantity"
                                        value={item.quantity}
                                        disabled
                                        className="form-control input-number"
                                      />
                                      <span className="input-group-prepend">
                                        <button
                                          type="button"
                                          className="btn quantity-right-plus"
                                          onClick={() => plusQty(item.id, item.quantity)}
                                          data-type="plus"
                                          data-field=""
                                        >
                                          <i className="fa fa-angle-right"></i>
                                        </button>
                                      </span>
                                    </>
                                  }
                                </div>
                              </div>
                              {item.product.quantity >= item.product.stock ? t('out_of_stock') : ""}
                            </td>
                            <td>
                              {removing ? <Spinner size='sm' /> :
                                <Button color="danger" className="icon me-3 p-2 rounded d-inline-flex justify-content-center align-items-center m-auto">
                                  <i
                                    className="fa fa-times"
                                    onClick={() => handleRemove(item.id)}
                                  ></i>
                                </Button>
                              }
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
                        <td className="coupon-section">
                          <Form className="theme-form" onSubmit={formik.handleSubmit}>
                            <InputGroup>
                              <Label className="w-100 text-start form-label">{t('coupon')}</Label>
                              <Input
                                className="form-control me-1"
                                type="text"
                                name="code"
                                disabled={cartData.coupon ? true : false}
                                onChange={formik.handleChange}
                                value={formik.values.code}
                              />
                              <Button className={cartData.coupon ? "btn-danger" : "btn-solid"} disabled={validateCode} type={cartData.coupon ? "button" : "submit"}
                                onClick={() => cartData.coupon ? removeCoupon() : ''}
                              >
                                {validateCode ? <Spinner size='md' className="m-auto" /> : cartData.coupon ? t('delete') : t('save')}
                              </Button>
                            </InputGroup>
                          </Form>
                        </td>
                        <td className="total-text">{t('total_price')} :</td>
                        <td className="total">
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
                  <Link href="/" className="btn btn-solid">
                    {t('continue_shopping')}
                  </Link>
                </Col>
                <Col xs="6">
                  <Link href={`/account/checkout`} className="btn btn-solid">
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
                            className="img-fluid mb-4 m-auto"
                            alt="icon empty cart"
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
    </>

  );
};

export default CartPage;
