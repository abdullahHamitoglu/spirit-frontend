import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import useCartStore from "../../helpers/cart/cartStore";
import useUserStore from "../../helpers/user/userStore";
import Link from "next/link";
import { toast } from "react-toastify";

import { Wizard, Steps, Step } from 'react-multistep-wizard';
import CheckoutLoader from "../layouts/Bags/common/checkoutLoader";
import AddressForm from "../account/addressForm";

const CheckoutPage = () => {
  const { redirect_url, saveCheckoutOrder, orderDetails, getCart, cartData, saveCheckoutPayment, savedAddress, saveCheckoutShipping, paymentMethods } = useCartStore();
  const { addresses } = useUserStore();
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const sippingValidationSchema = Yup.object().shape({
    shipping_method: Yup.string().required(t('this_field_is_required'))
  });
  const paymentValidationSchema = Yup.object().shape({
    payment_method: Yup.string().required(t('this_field_is_required'))
  });
  
  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Row className="d-flex flex-wrap justify-content-center">
              <Wizard>
                <Steps>
                  <Step>
                    {ctx => (
                      <AddressForm checkout={true} ctx={ctx} col='6' button={true} address={addresses[0]} />
                    )}
                  </Step>
                  <Step>
                    {ctx => (
                      <>
                        <Formik
                          enableReinitialize
                          initialValues={{
                            shipping_method: '',
                          }}
                          validationSchema={sippingValidationSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            saveCheckoutShipping(values, locale);
                            ctx.next()
                            setSubmitting(false);
                          }} >
                          {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                              <Col lg="6" sm="12" xs="12">
                                <div className="checkout-title">
                                  <h3>{t('shipping_type')}</h3>
                                </div>
                                <div className="row check-out">
                                  {savedAddress && savedAddress.rates ?
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                      <div className="checkout-details">
                                        <div className="order-box">
                                          <div className="title-box">
                                            <div>
                                              {t('product')} <span>{t('total')}</span>
                                            </div>
                                          </div>
                                          <ul className="qty">
                                            {savedAddress.cart.items.map((item, index) => (
                                              <li key={index}>
                                                {item.product.name} × {item.quantity}{" "}
                                                <span>
                                                  {item.formatted_total}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                          <ul className="sub-total">
                                            <li>
                                              {t('subtotal')}{" "}
                                              <span className="count">
                                                {savedAddress.cart.formatted_sub_total}
                                              </span>
                                            </li>
                                            <li>
                                              {t('tasks')}{" "}
                                              <span className="count">
                                                {savedAddress.cart.formatted_tax_amount}
                                              </span>
                                            </li>
                                            <li>
                                              {t('shipping')}
                                              <div className="shipping">
                                                {savedAddress.rates.map((rate, i) => (
                                                  <div className="shopping-option" key={i}>
                                                    <Field type="radio" className="form-check-input" name="shipping_method" value={rate.method} id={rate.method} onChange={(e) => setFieldValue('shipping_method', e.target.value)} />
                                                    <label className={`${errors.shipping_method && touched.shipping_method && 'text-danger'}`} htmlFor={rate.method}>{rate.carrier_title} </label>
                                                  </div>
                                                ))}
                                              </div>
                                            </li>
                                          </ul>
                                          <ul className="total">
                                            <li>
                                              {t('total_label')}{" "}
                                              <span className="count">
                                                {savedAddress.cart.formatted_grand_total}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-md-12">
                                          <button className="btn btn-sm btn-solid" type="button" onClick={ctx.previous}>{t('previous')}</button>
                                          <button className="btn btn-sm btn-solid mx-4" type="submit">{t('next')}</button>
                                        </div>
                                      </div>
                                    </div>
                                    : <CheckoutLoader />
                                  }
                                </div>
                              </Col>

                            </Form>
                          )}
                        </Formik>
                      </>
                    )}
                  </Step>
                  <Step>
                    {ctx => (
                      <>
                        <Formik
                          enableReinitialize
                          initialValues={{
                            payment_method: '',
                          }}
                          validationSchema={paymentValidationSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            saveCheckoutPayment(values, locale);
                            saveCheckoutOrder(locale);
                            setSubmitting(false);
                            ctx.next()
                          }} >
                          {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                              <Col lg="6" sm="12" xs="12">
                                <div className="checkout-title">
                                  <h3>{t('payment_type')}</h3>
                                </div>
                                <div className="row check-out">
                                  {paymentMethods && paymentMethods.methods ?
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                      <div className="checkout-details">
                                        <div className="order-box">
                                          <div className="title-box">
                                            <div>
                                              {t('product')} <span>{t('total')}</span>
                                            </div>
                                          </div>
                                          <ul className="qty">
                                            {paymentMethods.cart.items.map((item, index) => (
                                              <li key={index}>
                                                {item.product.name} × {item.quantity}{" "}
                                                <span>
                                                  {item.formatted_total}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                          <ul className="sub-total">
                                            <li>
                                              {t('subtotal')}{" "}
                                              <span className="count">
                                                {paymentMethods.cart.formatted_sub_total}
                                              </span>
                                            </li>
                                            <li>
                                              {t('tasks')}{" "}
                                              <span className="count">
                                                {paymentMethods.cart.formatted_tax_amount}
                                              </span>
                                            </li>
                                            <li>
                                              {t('payment')}
                                              <div className="shipping">
                                                {paymentMethods.methods.map((rate, i) => (
                                                  <div className="shopping-option" key={i}>
                                                    <Field type="radio" className="form-check-input" name="payment_method" value={rate.method} id={rate.method} onChange={(e) => setFieldValue('payment_method', e.target.value)} />
                                                    <label className={`${errors.checkout_method && touched.checkout_method && 'text-danger'}`} htmlFor={rate.method}>{rate.method_title}</label>
                                                  </div>
                                                ))}
                                              </div>
                                            </li>
                                          </ul>
                                          <ul className="total">
                                            <li>
                                              {t('total_label')}{" "}
                                              <span className="count">
                                                {paymentMethods.cart.formatted_grand_total}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-md-12">
                                          <button className="btn btn-sm btn-solid" type="button" onClick={ctx.previous}>{t('previous')}</button>
                                          <button className="btn btn-sm btn-solid mx-4" type="submit">{t('next')}</button>
                                        </div>
                                      </div>
                                    </div>
                                    : <CheckoutLoader />
                                  }
                                </div>
                              </Col>

                            </Form>
                          )}
                        </Formik>
                      </>
                    )}
                  </Step>
                  <Step>
                    {ctx => (
                      <>
                        <div className="d-flex flex-wrap justify-content-center">
                          <Row>
                            {orderDetails && orderDetails.cart ?
                              <>
                                <Col lg="6" sm="12" xs="12">
                                  <div className="checkout-title">
                                    <h3>{t('order_details')}</h3>
                                  </div>
                                  <div className="row check-out">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                      <div className="checkout-details">
                                        <div className="order-box">
                                          <div className="title-box">
                                            <div>
                                              {t('product')} <span>{t('total')}</span>
                                            </div>
                                          </div>

                                          <ul className="qty">
                                            {orderDetails.cart.items.map((item, index) => (
                                              <li key={index} className="d-flex w-100 justify-content-between">
                                                <p>{item.product.name} × {item.quantity}{" "}</p>
                                                <span className="text-start">
                                                  {item.formatted_total}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                          <ul className="sub-total">
                                            <li>
                                              {t('shipping')}
                                              <span className="count">
                                                {orderDetails.cart.selected_shipping_rate.carrier_title}
                                              </span>
                                            </li>
                                            {payment &&
                                              <li>
                                                {t('payment')}
                                                <span className="count">
                                                  {orderDetails.cart.payment.method_title}
                                                </span>
                                              </li>
                                            }
                                            <li>
                                              {t('subtotal')}{" "}
                                              <span className="count">
                                                {orderDetails.cart.formatted_sub_total}
                                              </span>
                                            </li>
                                            <li>
                                              {t('tasks')}{" "}
                                              <span className="count">
                                                {JSON.parse(orderDetails.cart.formatted_taxes)[0]}
                                              </span>
                                            </li>
                                          </ul>
                                          <ul className="total">
                                            <li>
                                              {t('total_label')}{" "}
                                              <span className="count">
                                                {orderDetails.cart.formatted_grand_total}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-md-12">
                                          <button className="btn btn-sm btn-solid" type="button" onClick={ctx.previous}>{t('previous')}</button>
                                          <button className="btn btn-sm btn-solid mx-4" type="button" onClick={ctx.next}>{t('next')}</button>
                                          <Link href={redirect_url ? redirect_url : '/'} className="btn btn-sm btn-solid mx-4" type="button">{t('pay')}</Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col lg="6" sm="12" xs="12" className="last-step-address">
                                  <AddressForm address={orderDetails.cart.billing_address} col='12' isDetails />
                                </Col>
                              </>
                              : <CheckoutLoader />
                            }
                          </Row>
                        </div>
                      </>
                    )}
                  </Step>
                  <Step>
                    {ctx => (
                      <>
                        <iframe src={redirect_url} height="200" width="300" title="Iframe Example"></iframe>
                      </>
                    )}
                  </Step>
                </Steps>
              </Wizard>
            </Row>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
