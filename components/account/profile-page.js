import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import useUserStore from '@/helpers/user/userStore';
import isEqual from "lodash/isEqual";
import { method } from 'lodash';

const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
};

const ProfilePage = ({ userDetails }) => {
    const { updateProfile, Address, address } = useUserStore();
    const { t } = useTranslation();

    const [user, setUser] = useState({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        date_of_birth: formatDate(userDetails.date_of_birth),
        gender: userDetails.gender,
        phone: userDetails.phone,
        password: '',
        password_confirmation: ''
    });



    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string().required('Company name is required'),
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email'),
        address1: Yup.array().required('address1 is required'),
        state: Yup.string().required('state is required'),
        city: Yup.string().required('city is required'),
        postcode: Yup.string().required('postcode is required'),
        phone: Yup.string().required('phone is required'),
        vat_id: Yup.string().required('vat id is required')
    });

    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18); // Maximum age is 18 years
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 90); // Maximum age is 90 years

    const maxDateString = maxDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    const minDateString = minDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd

    return (
        <>
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>{t('personal_details')}</h3>
                            <Formik
                                initialValues={{
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    date_of_birth: user.date_of_birth,
                                    gender: user.gender,
                                    phone: user.phone,
                                    password: '',
                                    password_confirmation: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    updateProfile(values);
                                    setUser({
                                        password: '',
                                        password_confirmation: ''
                                    })
                                    setSubmitting(false);
                                }}
                                on >
                                {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues }) => (
                                    <Form className="theme-form" onSubmit={handleSubmit} >
                                        <Row>
                                            <Col md="6">
                                                <Label className="form-label" for="first_name">{t('first_name')}
                                                    {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                                </Label>
                                                <Field type="text" className="form-control" id="first_name" name='first_name' placeholder={t('inter.name')} value={values.first_name} onChange={(e) => setFieldValue('first_name', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="last_name">{t('last_name')}
                                                    {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                                </Label>
                                                <Field type="text" className="form-control" id="last_name" name='last_name' placeholder={t('inter.name')} required="" value={values.last_name} onChange={(e) => setFieldValue('last_name', e.target.value)} />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="email">{t('email')}</Label>
                                                <Field type="email" className="form-control" id="email" placeholder={t('inter.email')} disabled value={userDetails.email} />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="phone">{t('phone')}</Label>
                                                <Field type="number" className="form-control" id="phone" name='phone' placeholder={t('inter.number')} value={values.phone} onChange={(e) => setFieldValue('phone', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="date_of_birth">{t('date_of_birth')}</Label>
                                                <Field type="date" className="form-control" id="date_of_birth" max={maxDateString} min={minDateString} name='date_of_birth' placeholder={t('inter.date_of_birth')} value={values.date_of_birth} onChange={(e) => setFieldValue('date_of_birth', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6" className='search-box'>
                                                <label className="form-label" htmlFor="gender">{t('gender')}:</label>
                                                <select className="form-select form-control py-2" size="1" value={values.gender} onChange={(e) => setFieldValue('gender', e.target.value)}>
                                                    <option value="f">{t("female")}</option>
                                                    <option value="m">{t('male')}</option>
                                                </select>
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="password">{t('password')}</Label>
                                                <Field type="password" className="form-control" id="password" name='password' placeholder={t('inter.password')} onChange={(e) => setFieldValue('password', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="password_confirmation">{t('confirm_password')}</Label>
                                                <Field type="password" className="form-control" id="password_confirmation" name='password_confirmation' placeholder={t('inter.password')} required="" onChange={(e) => setFieldValue('password_confirmation', e.target.value)} />
                                            </Col>
                                            <Col md="12">
                                                <button className={`btn btn-sm mt-4 btn-solid`} type="submit" disabled={isSubmitting || isEqual(values, user)}>{isSubmitting ? t('loading') : t('save')}</button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="contact-page register-page section-b-space">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>{t("shipping_address")}</h3>

                            <Formik
                                initialValues={{
                                    company_name: "",
                                    first_name: "",
                                    last_name: "",
                                    email: "",
                                    address1: [],
                                    country: "",
                                    state: "",
                                    city: "",
                                    postcode: "",
                                    phone: "",
                                    vat_id: ""
                                }}
                                validationSchema={addressValidationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    Address(values, 'post');
                                    setSubmitting(false);
                                }}
                            >
                                {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues }) => (
                                    <Form className="theme-form">
                                        <Row>
                                            <Col md="6">
                                                <Label className="form-label" for="company_name">{t('company_name')}
                                                    {errors.company_name && touched.company_name && <span className="error ms-1 text-danger">{errors.company_name}</span>}
                                                </Label>
                                                <Field type="text" className="form-control" id="company_name" name='company_name' placeholder={t('inter.company_name')} onChange={(e) => setFieldValue('company_name', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="first_name">{t('first_name')}
                                                    {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                                </Label>
                                                <Field type="text" className="form-control" id="first_name" name='first_name' placeholder={t('inter.name')} value={values.first_name} onChange={(e) => setFieldValue('first_name', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="last_name">{t('last_name')}
                                                    {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                                </Label>
                                                <Field type="text" className="form-control" id="last_name" name='last_name' placeholder={t('inter.name')} required="" value={values.last_name} onChange={(e) => setFieldValue('last_name', e.target.value)} />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="email">{t('email')}</Label>
                                                <Field type="email" className="form-control" id="email" placeholder={t('inter.email')} name="email" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="phone">{t('phone')}</Label>
                                                <Field type="number" className="form-control" id="phone" name='phone' placeholder={t('inter.number')} value={values.phone} onChange={(e) => setFieldValue('phone', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="home-ploat">{t("flat_plot_label")}</Label>
                                                <Input type="text" className="form-control" id="home-ploat" placeholder={t("flat_plot_label")} required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="address-two">{t("address_label")}</Label>
                                                <Input type="text" className="form-control" id="address-two" placeholder={t("address_label")} required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="zip-code">{t("zip_code_label")}</Label>
                                                <Input type="number" className="form-control" id="zip-code" placeholder={t("zip_code_label")} required="" />
                                            </Col>
                                            <Col md="6" className="select_input">
                                                <Label className="form-label" for="country">{t("country_label")}</Label>
                                                <select className="form-select py-2" size="1">
                                                    {/* {countries && countries.map((country) => (
                                                        <option value={country.code}>{country.name}</option>
                                                    ))} */}
                                                </select>
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="city">{t("city_label")}</Label>
                                                <Input type="text" className="form-control" id="city" placeholder={t("city_label")} required="" />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="region-state">{t("region_state_label")}</Label>
                                                <Input type="text" className="form-control" id="region-state" placeholder={t("region_state_label")} required="" />
                                            </Col>
                                            <div className="col-md-12">
                                                <button className="btn btn-sm btn-solid" type="submit">{t("button_text")}</button>
                                            </div>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
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


export default ProfilePage;