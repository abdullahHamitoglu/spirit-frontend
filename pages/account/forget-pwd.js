import React from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { Container, Row, Input, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Field, Form } from "formik";
import useUserStore from '@/helpers/user/userStore';
import { useRouter } from 'next/router';

const ForgetPwd = () => {
    const { forgetPwd } = useUserStore();
    const { locale } = useRouter();
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
                            <h2>{t('forget_your_password')}</h2>
                            <Formik
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    forgetPwd(values, locale);
                                    setSubmitting(false);
                                }} >
                                {({
                                    handleSubmit,
                                    errors,
                                    touched,
                                    isSubmitting
                                    /* and other goodies */
                                }) => (
                                    <Form className="theme-form" onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md="12">
                                                <Field type="email" className={`form-control ${errors.email ?? 'border-error'}`} id="email" name="email" placeholder={errors.password && touched.password ? errors.password : t('email')} required="" />
                                            </Col>
                                            {isSubmitting}
                                            <button type='submit' className="btn btn-solid w-auto">
                                                {isSubmitting ? 'loading' : t('submit')}
                                            </button>
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