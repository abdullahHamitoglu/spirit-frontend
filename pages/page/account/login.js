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
import * as Yup from 'yup';

const Login = () => {
  const osDetails = getUserAgent();
  const { state, login } = useUser();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  if (state.isAuthenticated) {
    router.push('/')
  }
  return (
    <CommonLayout parent={t('home')} title={t('login')}>
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>{t('login')}</h3>
              <div className="theme-card">
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    device_name: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    login(values)
                    setSubmitting(false);
                  }} >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    /* and other goodies */
                  }) => (
                    <Form className="theme-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="12">
                          <Label className="form-label" for="email">{t('email')}
                            {errors.email && touched.email && <span className="error ms-1 text-danger">{errors.email}</span>}
                          </Label>
                          <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" />
                        </Col>
                        <Col md="12">
                          <Label className="form-label" for="password">{t('password')}
                            {errors.password && touched.password && <span className="error ms-1 text-danger">{errors.password}</span>}
                          </Label>
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
              <h3>{t('new_customer')}</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">{t("create_account")}</h6>
                <p>{t('create_account_text')}</p>
                <a href="#" className="btn btn-solid">
                  {t('create_account')}
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
