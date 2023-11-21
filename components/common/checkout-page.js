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

const CheckoutPage = () => {
  const { orderDetails, getCart, cartData, saveCheckoutPayment, saveCheckoutAddress, savedAddress, saveCheckoutShipping, paymentMethods } = useCartStore();
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const { getAddresses, addresses, address, getAddressById } = useUserStore();
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const addressValidationSchema = Yup.object().shape({
    company_name: Yup.string().required(t('this_field_is_required')),
    first_name: Yup.string().required(t('this_field_is_required')),
    last_name: Yup.string().required(t('this_field_is_required')),
    email: Yup.string().email(t('invalid_email')).required(t('this_field_is_required')),
    address1: Yup.array().required(t('this_field_is_required')),
    state: Yup.string().required(t('this_field_is_required')),
    city: Yup.string().required(t('this_field_is_required')),
    postcode: Yup.string().required(t('this_field_is_required')),
    phone: Yup.string().required(t('this_field_is_required')),
    // vat_id: Yup.string().required(t('this_field_is_required')),
  });
  const sippingValidationSchema = Yup.object().shape({
    shipping_method: Yup.string().required(t('this_field_is_required'))
  });
  const paymentValidationSchema = Yup.object().shape({
    payment_method: Yup.string().required(t('this_field_is_required'))
  });

  const handleAddress = (id) => {
    getAddressById(locale, id);
  }
  useEffect(() => {
    getCart();
    getAddresses(locale);
    if (!cartData) {
      toast.warn(t('your_cart_is_empty'));
      router.push('/products');
    }
  }, []);
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
                      <Formik
                        enableReinitialize
                        initialValues={{
                          company_name: address.company_name,
                          first_name: address.first_name,
                          last_name: address.last_name,
                          email: address.email,
                          address1: address.address1,
                          country: address.country,
                          state: address.state,
                          city: address.city,
                          postcode: address.postcode,
                          phone: address.phone,
                          vat_id: address.vat_id
                          // shipping_method: '', 
                          // payment_method: '',
                          // register_device_id: ''
                        }}
                        validationSchema={addressValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          ctx.next()
                          saveCheckoutAddress(values, locale);
                          setSubmitting(false);
                        }}
                        errors={(errors) => {
                          console.log(errors)
                        }}
                      >
                        {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                          <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                            <Col lg="6" sm="12" xs="12">
                              <div className="checkout-title">
                                <h3>{t('billing_details')}</h3>
                              </div>
                              <div className="row check-out">
                                {addresses &&
                                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                    <div className="field-label d-flex justify-content-between">
                                      <label>{t("shipping_address")}</label>
                                      <Link style={{ color: '#54c3bd' }} href={'/addresses#form'}>{t('add_new_address')}</Link>
                                    </div>
                                    <select name="address" onChange={() => handleAddress(event.target.value)}>
                                      {addresses.map((address, i) => (
                                        <option key={i} value={address.id}>{address.company_name}</option>
                                      ))}
                                    </select>
                                  </div>
                                }
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="company_name">
                                    {t('company_name')}
                                    {errors.company_name && touched.company_name && <span className="error ms-1 text-danger">{errors.company_name}</span>}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="company_name"
                                    name='company_name'
                                    placeholder={t('inter.company_name')}
                                    onChange={(e) => setFieldValue('company_name', e.target.value)}
                                    value={values.company_name}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="first_name">
                                    {t('first_name')}
                                    {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    name='first_name'
                                    placeholder={t('inter.name')}
                                    value={values.first_name}
                                    onChange={(e) => setFieldValue('first_name', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="last_name">
                                    {t('last_name')}
                                    {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name='last_name'
                                    placeholder={t('inter.name')}
                                    required=""
                                    value={values.last_name}
                                    onChange={(e) => setFieldValue('last_name', e.target.value)}
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="email">
                                    {t('email')}
                                  </Label>
                                  <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder={t('inter.email')}
                                    name="email"
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="phone">
                                    {t('phone')}
                                  </Label>
                                  <Field
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    name='phone'
                                    placeholder={t('inter.number')}
                                    value={values.phone}
                                    onChange={(e) => setFieldValue('phone', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="state">
                                    {t('state')}
                                    {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    name='state'
                                    placeholder={t('inter.state')}
                                    value={values.state}
                                    onChange={(e) => setFieldValue('state', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="address1">
                                    {t("address_label")}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    placeholder={t("address_label")}
                                    value={values.address1 && values.address1[0]}
                                    onChange={(e) => setFieldValue('address1', [e.target.value])}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="zip-code">
                                    {t("postcode")}
                                  </Label>
                                  <Field
                                    type="number"
                                    className="form-control"
                                    id="zip-code"
                                    name="postcode"
                                    placeholder={t("postcode")}
                                    required=""
                                    value={values.postcode}
                                    onChange={(e) => setFieldValue('postcode', e.target.value)}
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="country">
                                    {t("country_label")}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    placeholder={t("country_label")}
                                    value={values.country}
                                    onChange={(e) => setFieldValue('country', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="city">
                                    {t("city_label")}
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    placeholder={t("city_label")}
                                    required=""
                                    value={values.city}
                                    onChange={(e) => setFieldValue('city', e.target.value)}
                                  />
                                </Col>
                                <div className="col-md-12">
                                  <button className="btn btn-sm btn-solid" type="submit">{t('next')}</button>
                                </div>
                              </div>
                            </Col>
                          </Form>
                        )}
                      </Formik>
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
                                                    <Field type="radio" className="form-check-input" name="shipping_method" value={rate.rates[0].method} id={rate.rates[0].method} onChange={(e) => setFieldValue('shipping_method', e.target.value)} />
                                                    <label className={`${errors.shipping_method && touched.shipping_method && 'text-danger'}`} htmlFor={rate.rates[0].method}>{rate.rates[0].carrier_title} </label>
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
                            ctx.next()
                            setSubmitting(false);
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
                                                    <label className={`${errors.payment_method && touched.payment_method && 'text-danger'}`} htmlFor={rate.method}>{rate.method_title}</label>
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
                        <Formik
                          enableReinitialize
                          initialValues={{
                            payment_method: '',
                          }}
                          onSubmit={(values, { setSubmitting }) => {
                            ctx.next()
                            setSubmitting(false);
                          }} >
                          {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                              <Col lg="6" sm="12" xs="12">
                                <div className="checkout-title">
                                  <h3>{t('order_details')}</h3>
                                </div>
                                <div className="row check-out">
                                  {orderDetails && orderDetails.cart ?
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                      <div className="checkout-details">
                                        <div className="order-box">
                                          <Row>
                                            <Col md='6' className="customerDetails">
                                              <p>{t('name')} : {orderDetails.cart.customer_first_name + ' ' + orderDetails.cart.customer_last_name}</p>
                                              <p>{t('email')} : {orderDetails.cart.customer_email + ' '}</p>
                                              {/* <p>{t('shipping_type')} : {orderDetails.selected_shipping_rate.carrier_title + ' '}</p> */}
                                            </Col>
                                          </Row>
                                          <div className="title-box">
                                            <div>
                                              {t('product')} <span>{t('total')}</span>
                                            </div>
                                          </div>
                                          <ul className="qty">
                                            {orderDetails.cart.items.map((item, index) => (
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
                                                {orderDetails.cart.formatted_sub_total}
                                              </span>
                                            </li>
                                            <li>
                                              {t('tasks')}{" "}
                                              <span className="count">
                                                {orderDetails.cart.formatted_tax_amount}
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
                                          <button className="btn btn-sm btn-solid mx-4" type="submit">{t('pay')}</button>
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
