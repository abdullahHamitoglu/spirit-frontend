import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '../../../helpers/user/userContext';
const Login = () => {
  const { state, dispatch } = useUser();
  const { locale, locales } = useRouter();
  const { t } = useTranslation();
  var userAgent = window.navigator.userAgent;
  const router = useRouter();
  console.log(state)
  const [deviceName, setDeviceName] = useState();
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Windows') !== -1) {
      setDeviceName('Windows.');
    } else if (userAgent.indexOf('Mac OS') !== -1) {
      setDeviceName('macOS.');
    } else if (userAgent.indexOf('Linux') !== -1) {
      setDeviceName('Linux.');
    } else if (userAgent.indexOf('Android')) {
      setDeviceName('Android.');
    }
  }, [deviceName]);
  if(state.isAuthenticated){
    router.push('/')
  }
  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    device_name: ''
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    axios({
                      method: 'post',
                      url: process.env.API_URL + `api/v1/customer/login?locale=${locale.slice(0, 2)}`,
                      data: {
                        email: values.email,
                        password: values.password,
                        device_name: deviceName
                      },
                    }).then(res => {
                      if (res.status == 200) {
                        toast.success(res.data.message)
                        // sessionStorage.setItem('token', res.data.token)
                        // if (res.data.token) {
                        //   router.push('/')
                        // }
                        dispatch({ type: 'LOGIN', user: res.data });
                      } else {
                        toast.success(res.data.message)
                      }
                    }).catch(function (error, errors) {
                      if (error.response) {
                        toast.error(error.response.data.message);
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                      }
                      console.log(errors);
                    });
                    setSubmitting(false);
                  }} >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Form className="theme-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="12">
                          <Label className="form-label" for="email">{t('email')}</Label>
                          <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" />
                          <Field type="text" className="form-control d-none" id="device_name" value={deviceName} name="device_name" required="" />
                        </Col>
                        <Col md="12">
                          <Label className="form-label" for="password">{t('password')}</Label>
                          <Field type="password" className="form-control" id="password" name="password"
                            placeholder={t('enter_your_password')} required="" />
                        </Col>
                        <Col md="12">
                          <button type="submit" className="btn btn-solid w-auto">{t('login')}</button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
                <a href="#" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
