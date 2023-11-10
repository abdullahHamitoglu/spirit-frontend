import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import useCartStore from "../../helpers/cart/cartStore";
import useUserStore from "../../helpers/user/userStore";

const CheckoutPage = () => {
  const { getCart, cartData, removeFromCart, cartLoading } = useCartStore();
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const { register, isAuthenticated } = useUserStore();
  const router = useRouter();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = (data) => {
    if (data !== "") {
      alert("You submitted the form and stuff!");
      router.push({
        pathname: "/page/order-success",
        state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      });
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };
  useEffect(() => {
    getCart();
  }, [])
  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone:'',
                country:'',
                address:'',
                city:'',
                state:'',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                register(values, locale);
                setSubmitting(false);
              }} >
              {({ values, errors, touched, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg="6" sm="12" xs="12">
                      <div className="checkout-title">
                        <h3>{t('billing_details')}</h3>
                      </div>
                      <div className="row check-out">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">{t('first_name_label')}</div>
                          <input type="text" className={`${errors.first_name ? "error_border" : ""}`} name="first_name" />
                          <span className="error-message">{errors.first_name && t('first_name_required')}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">{t('last_name_label')}</div>
                          <input type="text" className={`${errors.last_name ? "error_border" : ""}`} name="last_name" />
                          <span className="error-message">{errors.last_name && t('last_name_required')}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">{t('phone_label')}</div>
                          <input type="text" name="phone" className={`${errors.phone ? "error_border" : ""}`} />
                          <span className="error-message">{errors.phone && t('phone_required')}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">{t('email_label')}</div>
                          <input
                            className={`${errors.email ? "error_border" : ""}`}
                            type="text"
                            name="email"
                          />
                          <span className="error-message">{errors.email && t('valid_email_required')}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">{t('country_label')}</div>
                          <select name="country" >
                            <option>India</option>
                            <option>South Africa</option>
                            <option>United State</option>
                            <option>Australia</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">{t('address_label')}</div>
                          <input
                            className={`${errors.address ? "error_border" : ""}`}
                            type="text"
                            name="address"
                            placeholder={t('street_address_placeholder')}
                          />
                          <span className="error-message">{errors.address && t('address_required')}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">{t('city_label')}</div>
                          <input
                            type="text"
                            className={`${errors.city ? "error_border" : ""}`}
                            name="city"
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.city && t('select_city')}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">{t('state_label')}</div>
                          <input
                            type="text"
                            className={`${errors.state ? "error_border" : ""}`}
                            name="state"
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.state && t('select_state')}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">{t('postal_code_label')}</div>
                          <input
                            type="text"
                            name="pincode"
                            className={`${errors.pincode ? "error_border" : ""}`} />
                          <span className="error-message">{errors.pincode && t('required_integer')}</span>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <input type="checkbox" name="create_account" id="account-option" />
                          &ensp; <label htmlFor="account-option">{t('create_account_question')}</label>
                        </div>
                      </div>
                    </Col>
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
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
