import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as Yup from 'yup';
import useUserStore from '@/helpers/user/userStore';
import CommonLayout from '@/components/shop/common-layout';


const Register = () => {
    const { locale } = useRouter();
    const { t } = useTranslation();
    const { register, isAuthenticated } = useUserStore();
    const router = useRouter();
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

    if (isAuthenticated) {
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
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        register(values, locale);
                                        setSubmitting(false);
                                    }} >
                                    {({ values, errors, touched, handleSubmit, isSubmitting, }) => (
                                        <Form className="theme-form" onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" htmlFor="first_name">{t('first_name')}
                                                        {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                                    </Label>
                                                    <Field type="text" className="form-control" id="first_name" name="first_name" placeholder={t('first_name')}
                                                        required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="last_name">{t('last_name')}
                                                        {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                                    </Label>
                                                    <Field type="text" className="form-control" id="last_name" name="last_name" placeholder={t('last_name')}
                                                        required="" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" for="email">{t('email')}
                                                        {errors.email && touched.email && <span className="error ms-1 text-danger">{errors.email}</span>}
                                                    </Label>
                                                    <Field type="email" className="form-control" id="email" name="email" placeholder={t('email')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password" >{t('password')}
                                                        {errors.password && touched.password && <span className="error ms-1 text-danger">{errors.password}</span>}
                                                    </Label>
                                                    <Field type="password" className="form-control" id="password" name="password"
                                                        placeholder={t('enter_your_password')} required="" />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="password">{t('password')}
                                                        {errors.password_confirmation && touched.password_confirmation && <span className="error ms-1 text-danger">{errors.password_confirmation}</span>}
                                                    </Label>
                                                    <Field type="password" className="form-control" id="password_confirmation" name="password_confirmation"
                                                        placeholder={t('confirm_password')} required="" />
                                                </Col>
                                                <Col md="12">
                                                    <button type="submit" className="btn btn-solid w-auto" disabled={isSubmitting}>{isSubmitting ? `${t('loading')}....` : t('create_account')}</button>
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