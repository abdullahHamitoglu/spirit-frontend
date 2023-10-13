import React, { useEffect, useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';

import { useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '@/helpers/user/userContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Register = () => {
    const { locale, locales } = useRouter();
    const { t } = useTranslation();
    const { register, state } = useUser();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        // Add other registration fields here
    });

    const handleRegistration = async () => {
        await register(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    if (state.isAuthenticated) {
        router.push('/')
    }
    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>{t('create_account')}</h3>
                            <div className="theme-card">
                                <Formik
                                    initialValues={{
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        password: '',
                                        password_confirmation: ''
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setFormData(values);
                                        handleRegistration();
                                        setSubmitting(false);
                                    }} >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleSubmit,
                                        isSubmitting,
                                        /* and other goodies */
                                    }) => (
                                        <Form className="theme-form" onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" htmlFor="first_name">{t('first_name')}</Label>
                                                    <Field type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder={t('first_name')}
                                                        required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="last_name">{t('last_name')}</Label>
                                                    <Field type="text" className="form-control" id="last_name" name="last_name" onChange={handleChange} value={formData.last_name} placeholder={t('last_name')}
                                                        required="" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" for="email">{t('email')}</Label>
                                                    <Field type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} placeholder={t('email')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password" >{t('password')}</Label>
                                                    <Field type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password}
                                                        placeholder={t('enter_your_password')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password">{t('password')}</Label>
                                                    <Field type="password" className="form-control" id="password_confirmation" onChange={handleChange} value={formData.password_confirmation} name="password_confirmation"
                                                        placeholder={t('confirm_password')} required="" />
                                                </Col>
                                                <Col md="12">
                                                    <button type="submit" className="btn btn-solid w-auto">{isSubmitting ? 'loading' : t('create_account')}</button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

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
export default Register