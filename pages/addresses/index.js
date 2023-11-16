import React, { useEffect } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Col, Container, Label, Row } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/helpers/user/userStore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const index = () => {
    const { locale } = useRouter();
    const router = useRouter();
    const { addresses, addAddress, getAddresses, user ,deleteAddress } = useUserStore()
    const { t } = useTranslation();
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string(),
        first_name: Yup.string(),
        last_name: Yup.string(),
        email: Yup.string().email(t('invalid_email')),
        address1: Yup.array(),
        state: Yup.string(),
        city: Yup.string(),
        postcode: Yup.string(),
        phone: Yup.string(),
        vat_id: Yup.string()
    });

    useEffect(() => {
        getAddresses(locale);
    }, []);
    const hanleDeleteAddress = (id)=>{
        deleteAddress(locale , id);
        getAddresses(locale);
    }
    return (
        <>
            <CommonLayout title={t('addresses')} parent={t('home')} >
                <section className="section-b-space border-1">
                    <Container>
                        <div className="box">
                            <Row>
                                {addresses ? addresses.map((address) => (
                                    <Col sm="3">
                                        <h6> {address.company_name}</h6>
                                        <address>
                                            <h6 className='text-black'>{t('address_label')}: {address.company_name}</h6>
                                            {t('name')}: {address.first_name} {address.last_name} <br />
                                            {t('phone')}: {address.phone} <br />{t('email')}: {address.email} <br />
                                            {t('address')}: {address.country} / {address.city} / {address.state} {address.postcode} <br />
                                            {t('address1')}: {address.address1[0]}  <br />
                                            <Link className='text-primary' href={`/addresses/${address.id}`}>{t('edit')}</Link>
                                            <a  className='text-danger ms-2' onClick={() => { hanleDeleteAddress(address.id) }}>{t('delete')}</a>
                                        </address>
                                    </Col>
                                )) : ''}
                            </Row>
                        </div>
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
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        email: user.email,
                                        address1: [],
                                        country: "",
                                        state: "",
                                        city: "",
                                        postcode: "",
                                        phone: user.phone,
                                        vat_id: ""
                                    }}
                                    validationSchema={addressValidationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        addAddress(values, locale);
                                        getAddresses(locale);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues }) => (
                                        <Form className="theme-form" onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md="6">
                                                    <Label className="form-label" for="company_name">
                                                        {t('company_name')}
                                                        {errors.company_name && touched.company_name && <span className="error ms-1 text-danger">{errors.company_name}</span>}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="company_name"
                                                        name='company_name'
                                                        placeholder={t('inter.company_name')}
                                                        onChange={(e) => setFieldValue('company_name', e.target.value)}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="first_name">
                                                        {t('first_name')}
                                                        {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="first_name"
                                                        name='first_name'
                                                        placeholder={t('inter.name')}
                                                        value={values.first_name}
                                                        onChange={(e) => setFieldValue('first_name', e.target.value)}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="last_name">
                                                        {t('last_name')}
                                                        {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="last_name"
                                                        name='last_name'
                                                        placeholder={t('inter.name')}
                                                        required=""
                                                        value={values.last_name}
                                                        onChange={(e) => setFieldValue('last_name', e.target.value)}
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="email">
                                                        {t('email')}
                                                    </Label>
                                                    <Field
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder={t('inter.email')}
                                                        name="email"
                                                        value={values.email}
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="phone">
                                                        {t('phone')}
                                                    </Label>
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        id="phone"
                                                        name='phone'
                                                        placeholder={t('inter.number')}
                                                        value={values.phone}
                                                        onChange={(e) => setFieldValue('phone', e.target.value)}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="state">
                                                        {t('state')}
                                                        {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="state"
                                                        name='state'
                                                        placeholder={t('inter.state')}
                                                        onChange={(e) => setFieldValue('state', e.target.value)}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="address1">
                                                        {t("address_label")}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="address1"
                                                        name="address1"
                                                        placeholder={t("address_label")}
                                                        value={[values.address1]}
                                                        onChange={(e) => setFieldValue('address1', [e.target.value])}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="zip-code">
                                                        {t("postcode")}
                                                    </Label>
                                                    <Field
                                                        type="number"
                                                        className="form-control"
                                                        id="zip-code"
                                                        name="postcode"
                                                        placeholder={t("postcode")}
                                                        required=""
                                                        value={values.postcode}
                                                        onChange={(e) => setFieldValue('postcode', e.target.value)}
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="country">
                                                        {t("country_label")}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="country"
                                                        name="country"
                                                        placeholder={t("country_label")}
                                                        value={values.country}
                                                        onChange={(e) => setFieldValue('country', e.target.value)}
                                                        required=""
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Label className="form-label" for="city">
                                                        {t("city_label")}
                                                    </Label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="city"
                                                        name="city"
                                                        placeholder={t("city_label")}
                                                        required=""
                                                        value={values.city}
                                                        onChange={(e) => setFieldValue('city', e.target.value)}
                                                    />
                                                </Col>
                                                <div className="col-md-12">
                                                    <button className="btn btn-sm btn-solid" type="submit" name="submit_button">
                                                        {t("button_text")}
                                                    </button>
                                                </div>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </CommonLayout>
        </>
    )
}
export async function getServerSideProps({ locale, params }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default index;