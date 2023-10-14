import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getUserAgent } from '../../../helpers/user/getUserAgent';
import { useUser } from '../../../helpers/user/userContext';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Login = () => {
  const osDetails = getUserAgent();
  const { state, login } = useUser();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    device_name: '',
    locale: ''
  });
  
  const handleLogin = () => {
    login(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      device_name : osDetails.name
    });
  };

  if (state.isAuthenticated) {
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
                    handleLogin(values);
                    setSubmitting(false);
                  }} >
                  {({
                    handleSubmit,
                    /* and other goodies */
                  }) => (
                    <Form className="theme-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="12">
                          <Label className="form-label" for="email">{t('email')}</Label>
                          <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" onChange={handleChange} value={formData.email} />
                        </Col>
                        <Col md="12">
                          <Label className="form-label" for="password">{t('password')}</Label>
                          <Field type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.email}
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
export async function getStaticProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}
export default Login;
