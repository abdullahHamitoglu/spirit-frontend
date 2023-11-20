import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col, Label, Input } from "reactstrap";
import { useRouter } from "next/router";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import useCartStore from "../../helpers/cart/cartStore";
import useUserStore from "../../helpers/user/userStore";
import Link from "next/link";
import { toast } from "react-toastify";

import { Wizard, Steps, Step } from 'react-multistep-wizard';

const CheckoutPage = () => {
  const { getCart, cartData, saveCheckoutAddress } = useCartStore();
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const { getAddresses, addresses, address, getAddressById } = useUserStore();
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required(t('this_field_is_required')),
    first_name: Yup.string().required(t('this_field_is_required')),
    last_name: Yup.string().required(t('this_field_is_required')),
    email: Yup.string().email(t('invalid_email')).required(t('this_field_is_required')),
    address1: Yup.array().required(t('this_field_is_required')),
    state: Yup.string().required(t('this_field_is_required')),
    city: Yup.string().required(t('this_field_is_required')),
    postcode: Yup.string().required(t('this_field_is_required')),
    phone: Yup.string().required(t('this_field_is_required')),
    vat_id: Yup.string().required(t('this_field_is_required')),
  });

  const checkhandle = (value) => {
    setPayment(value);
  };

  const handleAddress = (id) => {
    getAddressById(locale, id);
    console.log(address);
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
                          address: {
                            company_name: address.company_name,
                            first_name: address.first_name,
                            last_name: address.last_name,
                            email: address.email,
                            address1: address.address1 && address.address1.length > 0 ? address.address1[0] : '',
                            country: address.country,
                            state: address.state,
                            city: address.city,
                            postcode: address.postcode,
                            phone: address.phone,
                            vat_id: address.vat_id
                          },
                          // shipping_method: '',
                          // payment_method: '',
                          // register_device_id: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          saveCheckoutAddress(values)
                          setSubmitting(false);
                        }} >
                        {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                          <Form onSubmit={handleSubmit}>
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
                                    value={values.address.company_name}
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
                                    value={values.address.first_name}
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
                                    value={values.address.last_name}
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
                                    value={values.address.phone}
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
                                    value={values.address.state}
                                    onChange={(e) => setFieldValue('state', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="address1">
                                    {t("address_label")}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    placeholder={t("address_label")}
                                    value={[values.address.address1]}
                                    onChange={(e) => setFieldValue('address1', [e.target.value])}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="zip-code">
                                    {t("postcode")}
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="zip-code"
                                    name="postcode"
                                    placeholder={t("postcode")}
                                    required=""
                                    value={values.address.postcode}
                                    onChange={(e) => setFieldValue('postcode', e.target.value)}
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="country">
                                    {t("country_label")}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    placeholder={t("country_label")}
                                    value={values.address.country}
                                    onChange={(e) => setFieldValue('country', e.target.value)}
                                    required=""
                                  />
                                </Col>
                                <Col md="6" sm="12" xs="12" className="form-group">
                                  <Label className="form-label" for="city">
                                    {t("city_label")}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    placeholder={t("city_label")}
                                    required=""
                                    value={values.address.city}
                                    onChange={(e) => setFieldValue('city', e.target.value)}
                                  />
                                </Col>
                                <div className="col-md-12">
                                  <button className="btn btn-sm btn-solid" type="button" onClick={ctx.next}>{t('next')}</button>
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
                            // payment_method: '',
                            // register_device_id: ''
                          }}
                          validationSchema={validationSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            saveCheckoutAddress(values)
                            setSubmitting(false);
                          }} >
                          {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                              <Col lg="6" sm="12" xs="12">
                                <div className="checkout-title">
                                  <h3>{t('billing_details')}</h3>
                                </div>
                                <div className="row check-out">
                                  {addresses &&
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                      <div className="field-label d-flex justify-content-between">
                                        <label>{t("shipping_address")}</label>
                                      </div>
                                      <select name="shipping_method" value={values.shipping_method}>
                                        {addresses.map((address, i) => (
                                          <option key={i} value={address.id}>{address.company_name}</option>
                                        ))}
                                      </select>
                                    </div>
                                  }
                                  <div className="col-md-12">
                                    <button className="btn btn-sm btn-solid" type="button" onClick={ctx.previous}>{t('previous')}</button>
                                    <button className="btn btn-sm btn-solid" type="button" onClick={ctx.next}>{t('next')}</button>
                                  </div>
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
                      <Col lg="6" sm="12" xs="12">
                        {cartData && cartData.items && cartData.items.length > 0 ? (
                          <div className="checkout-details">
                            <div className="order-box">
                              <div className="title-box">
                                <div>
                                  {t('product')} <span>{t('total')}</span>
                                </div>
                              </div>
                              <ul className="qty">
                                {cartData.items.map((item, index) => (
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
                                    {cartData.formatted_total}
                                  </span>
                                </li>
                                <li>
                                  {t('shipping')}
                                  <div className="shipping">
                                    <div className="shopping-option">
                                      <input type="checkbox" name="free-shipping" id="free-shipping" />
                                      <label htmlFor="free-shipping">{t('free_shipping')}</label>
                                    </div>
                                    <div className="shopping-option">
                                      <input type="checkbox" name="local-pickup" id="local-pickup" />
                                      <label htmlFor="local-pickup">{t('local_pickup')}</label>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="total">
                                <li>
                                  {t('total_label')}{" "}
                                  <span className="count">
                                    {cartData.formatted_sub_total}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="payment-box">
                              <div className="upper-box">
                                <div className="payment-options">
                                  <ul>
                                    <li>
                                      <div className="radio-option stripe">
                                        <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => checkhandle("cod")} />
                                        <label htmlFor="payment-2">{t('cod')}</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="radio-option paypal">
                                        <input type="radio" name="payment-group" id="payment-1" onClick={() => checkhandle("paypal")} />
                                        <label htmlFor="payment-1">
                                          {t('paypal')}
                                          <span className="image">
                                            <Media src="/assets/images/paypal.png" alt="" />
                                          </span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {cartData.formatted_sub_total !== 0 ? (
                                <div className="text-end">
                                  {payment === "cod" ? (
                                    <button type="submit" className="btn-solid btn">
                                      {t('place_order')}
                                    </button>
                                  ) : ''}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
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
