import React from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { Container, Row, Form, Input, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Field } from "formik";

const ForgetPwd = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });
    const { t } = useTranslation();
    return (
        <CommonLayout parent={t('home')} title={t('forget_password')}>
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h2>{t('forget_your_password')}</h2> <Formik
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    login(values, locale)
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
                                                <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" />
                                            </Col>
                                            <a href="#" className="btn btn-solid w-auto">
                                                {t('submit')}
                                            </a>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
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

export default ForgetPwd;