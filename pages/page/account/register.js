import React, { useEffect, useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';

import { useTranslation } from 'react-i18next';
import {  Field, Formik } from 'formik';
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';


const Register = () => {
    const { locale, locales } = useRouter();
    const [user, setUser] = useState();

    const { t } = useTranslation();

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
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        axios({
                                            method: 'post',
                                            url: process.env.API_URL + `api/v1/customer/register?locale=${locale.slice(0, 2)}`,
                                            data: values,
                                        }).then(res => {
                                            if (res.status == 200) {
                                                toast.success(res.data.message)
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
                                                <Col md="6">
                                                    <Label className="form-label" htmlFor="first_name">{t('first_name')}</Label>
                                                    <Field type="text" className="form-control" id="first_name" name="first_name" placeholder={t('first_name')}
                                                        required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="last_name">{t('last_name')}</Label>
                                                    <Field type="text" className="form-control" id="last_name" name="last_name" placeholder={t('last_name')}
                                                        required="" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" for="email">{t('email')}</Label>
                                                    <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password">{t('password')}</Label>
                                                    <Field type="password" className="form-control" id="password" name="password"
                                                        placeholder={t('enter_your_password')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password">{t('password')}</Label>
                                                    <Field type="password" className="form-control" id="password_confirmation" name="password_confirmation"
                                                        placeholder={t('password_confirmation')} required="" />
                                                </Col>
                                                <Col md="12">
                                                    <button type="submit" className="btn btn-solid w-auto">{t('create_account')}</button>
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

export default Register