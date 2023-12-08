import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col, Label, CardHeader, Card, CardBody, CardFooter, Button, Input, FormGroup } from "reactstrap";
import { useRouter } from "next/router";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import useCartStore from "../../helpers/cart/cartStore";
import useUserStore from "../../helpers/user/userStore";
import Link from "next/link";
import CheckoutLoader from "../layouts/Bags/common/checkoutLoader";
import AddressForm from "../account/addressForm";
import EditAddressModal from "./editAddressModal";
import AddressModal from "./addNewAddressModal";
import CartCheckout from "../headers/common/cart-checkout";
import PostLoader from "./PostLoader";
import CardLoader from "./cardLoader";
import ButtonLoader from "./buttonLoader";
import PaymentModal from "./paymentModal";

const CheckoutPage = () => {
  const { redirect_url, rates, savedAddress, saveCheckoutShipping, cartData, paymentMethods, saveCheckoutAddress, saveCheckoutPayment } = useCartStore();
  const { getAddresses, addresses, isAuthenticated } = useUserStore();
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [modalAdd, setModalAdd] = useState(false);
  const [modal, setModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const paymentToggle = () => setPaymentModal(!paymentModal);
  const toggleEdit = () => setModal(!modal);
  const toggleAdd = () => setModalAdd(!modalAdd);
  const [checkoutAddress, setCheckoutAddress] = useState(addresses[0]);
  const [editableAddress, setEditableAddress] = useState(addresses[0]);
  const [addressLoader, setAddressLoader] = useState(false)
  const [buttonLoader, setButtonLoader] = useState(false)
  const [loading, setLoading] = useState(false);
  const sippingValidationSchema = Yup.object().shape({
    shipping_method: Yup.string().required(t('this_field_is_required'))
  });
  const paymentValidationSchema = Yup.object().shape({
    payment_method: Yup.string().required(t('this_field_is_required'))
  });
  useEffect(() => {
    if (isAuthenticated) {
      getAddresses(locale);
    }
  }, []);
  const handleCheckoutAddress = async (address) => {
    setAddressLoader(true);
    await saveCheckoutAddress(address, locale);
    setAddressLoader(false);
  }
  const handleCheckoutShipping = async (value) => {
    setLoading(true);
    await saveCheckoutShipping({ shipping_method: value }, locale);
    setLoading(false);
  }
  const handleCheckoutPayment = async (value) => {
    setButtonLoader(true);
    await saveCheckoutPayment({ payment_method: value }, locale);
    setButtonLoader(false);
  }
  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <Container>
            <Row>
              <Col lg='9'>
                <Card className="mb-3">
                  <CardHeader>
                    <h4 className="m-2 ms-0">{t('address')}</h4>
                  </CardHeader>
                  <CardBody>
                    <Button
                      color="success"
                      outline
                      size="lg"
                      className="border-success-subtle border rounded mb-5 w-auto"
                      onClick={toggleAdd}
                    >
                      <i className="fa fa-plus me-3" aria-hidden="true"></i>
                      {t('add_new_address')}
                    </Button>
                    <AddressModal toggle={toggleAdd} isOpen={modalAdd} />
                    <Row>
                      {isAuthenticated && addresses ?
                        addresses.map((address, i) => (
                          <Col lg='4' sm="12" key={i} className='mb-4'>
                            <Card className='h-100 '>
                              <CardHeader className="d-flex justify-content-between">
                                <h6 className='fs-4 p-2 mb-0 text-black'>{address.company_name}</h6>
                                <FormGroup switch>
                                  <Input
                                    type="radio"
                                    name="address"
                                    className="mt-2"
                                    onChange={() => handleCheckoutAddress(address)}
                                  />
                                </FormGroup>
                              </CardHeader>
                              <CardBody>
                                <p>{t('name')}: {address.first_name} {address.last_name}</p>
                                <p>{t('phone')}: {address.phone} </p>
                                <p>{t('email')}: {address.email}</p>
                                <p>{t('address')}: {address.country} / {address.city} / {address.state} {address.postcode} </p>
                                <p>{t('address1')}: {address.address1[0]}</p>
                              </CardBody>
                              <CardFooter className='row m-0 px-0'>
                                <Col xs='12'>
                                  <Button className='btn btn-warning d-block w-100 rounded' onClick={() => {
                                    toggleEdit();
                                    setEditableAddress(address);
                                  }} >{t('edit')}
                                  </Button>
                                </Col>
                              </CardFooter>
                            </Card>
                          </Col>
                        )) : ''}
                      {savedAddress && savedAddress.company_name &&
                        <Col lg='4' sm="12" className='mb-4'>
                          <Card className='h-100 bg-success-subtle'>
                            <CardHeader className="d-flex justify-content-between">
                              <h6 className='fs-4 p-2 mb-0 text-black'>{savedAddress.company_name}</h6>
                              <FormGroup switch>
                                <Input
                                  type="radio"
                                  name="address"
                                  className="mt-2"
                                  onChange={() => handleCheckoutAddress(savedAddress)}
                                />
                              </FormGroup>
                            </CardHeader>
                            <CardBody>
                              <p>{t('name')}: {savedAddress.first_name} {savedAddress.last_name}</p>
                              <p>{t('phone')}: {savedAddress.phone} </p>
                              <p>{t('email')}: {savedAddress.email}</p>
                              <p>{t('address')}: {savedAddress.country} / {savedAddress.city} / {savedAddress.state} {savedAddress.postcode} </p>
                              <p>{t('address1')}: {savedAddress.address1}</p>
                            </CardBody>
                            <CardFooter className='row m-0 px-0'>
                              <Col xs='12'>
                                <Button className='btn btn-warning d-block w-100 rounded' onClick={() => {
                                  toggleAdd();
                                }} >{t('edit')}
                                </Button>
                              </Col>
                            </CardFooter>
                          </Card>
                        </Col>
                      }
                      {addressLoader && <PostLoader className='col-4' />}
                    </Row>
                    <EditAddressModal toggle={toggleEdit} isOpen={modal} address={editableAddress} />
                  </CardBody>
                </Card>
                {rates && rates[0] &&
                  <Card className="mb-3">
                    <CardHeader>
                      <h4 className="m-2 ms-0">{t('shipping')}</h4>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        {rates.map((rate) => (
                          <FormGroup switch className="d-flex align-items-center" >
                            <Input
                              type="radio"
                              id={rate.id}
                              name='shipping_method'
                              value={rate.method}
                              className="me-2 mt-0"
                              onChange={(e) => handleCheckoutShipping(e.target.value)}
                            />
                            <Label htmlFor={rate.id} className="m-0">{rate.method_title} {rate.formatted_price}</Label>
                          </FormGroup>
                        ))
                        }
                      </Form>
                    </CardBody>
                  </Card>
                }
                {paymentMethods && paymentMethods[0] &&
                  <Card className="mb-3">
                    <CardHeader>
                      <h4 className="m-2 ms-0">{t('payment_type')}</h4>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        {paymentMethods.map((method) => (
                          <FormGroup switch className="d-flex align-items-center" >
                            <Input
                              type="radio"
                              id={method.id}
                              name={method.method}
                              value={method.method}
                              className="me-2 mt-0"
                              onChange={(e) => handleCheckoutPayment(e.target.value)}
                            />
                            <Label htmlFor={method.id} className="m-0">{method.method_title} {method.description}</Label>
                          </FormGroup>
                        ))
                        }
                      </Form>
                    </CardBody>
                  </Card>
                }
                {loading && <CardLoader />}
              </Col>
              <Col lg='3'>
                <Card>
                  <CardHeader>
                    <h4 className="m-2 ms-0">{t('tabText.details')}</h4>
                  </CardHeader>
                  <CardBody>
                    <ul className="show-div shopping-cart">
                      {cartData && cartData.items && cartData.items.map((item, index) => (
                        <CartCheckout key={index} item={item} total={item.formatted_total} />
                      ))}
                      {cartData && cartData.items && cartData.items.length > 0 ? (
                        <div>
                          <li>
                            <div className="total">
                              <h5>
                                {t('subtotal')} :{" "}
                                <span>
                                  {cartData.formatted_sub_total}
                                </span>
                              </h5>
                              <h5>
                                {t('tasks')} :{" "}
                                <span>
                                  {cartData.formatted_tax_total}
                                </span>
                              </h5>
                              {cartData.formatted_discount > 0 &&
                                <h5>
                                  {t('discount')} :{" "}
                                  <span>
                                    {cartData.formatted_discount}
                                  </span>
                                </h5>
                              }
                              <h5>
                                {t('total')} :{" "}
                                <span>
                                  {cartData.formatted_base_grand_total}
                                </span>
                              </h5>
                            </div>
                          </li>
                        </div>
                      ) : (
                        <li>
                          <h5>{t('your_cart_is_empty')}</h5>
                        </li>
                      )}
                    </ul>
                  </CardBody>
                </Card>
                <PaymentModal toggle={paymentToggle} isOpen={paymentModal} redirect_url={redirect_url} />
                {!buttonLoader ?
                  <Button block size="lg" disabled={redirect_url ? false : true} onClick={() => paymentToggle()} className="mt-4 btn-solid  rounded">{t('payment_complete')}</Button>
                  : <ButtonLoader />}
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
