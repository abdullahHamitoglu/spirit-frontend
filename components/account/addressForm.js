import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Label } from 'reactstrap';
import * as Yup from 'yup';
import useUserStore from '../../helpers/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCartStore from '@/helpers/cart/cartStore';

function AddressForm({ ctx, col ,isDetails , address }) {
    const { t } = useTranslation();
    const { locale } = useRouter();
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string().required(t('this_field_is_required')),
        first_name: Yup.string().required(t('this_field_is_required')),
        last_name: Yup.string().required(t('this_field_is_required')),
        email: Yup.string().email(t('invalid_email')).required(t('this_field_is_required')),
        address1: Yup.array().required(t('this_field_is_required')),
        state: Yup.string().required(t('this_field_is_required')),
        city: Yup.string().required(t('this_field_is_required')),
        postcode: Yup.string().required(t('this_field_is_required')),
        phone: Yup.string().required(t('this_field_is_required')),
    });
    const { saveCheckoutAddress } = useCartStore();
    const { getAddresses, addresses, getAddressById } = useUserStore();

    const handleAddress = (id) => {
        getAddressById(locale, id);
    }
    if(isDetails){
        
    }
    useEffect(() => {
        getAddresses(locale);
    }, [])
    return (

        <Formik
            enableReinitialize
            initialValues={{
                company_name: address.company_name ,
                first_name: address.first_name,
                last_name: address.last_name,
                email: address.email,
                address1: address.address1,
                country: address.country,
                state: address.state,
                city: address.city,
                postcode: address.postcode,
                phone: address.phone,
                vat_id: address.vat_id
            }}
            validationSchema={addressValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                ctx.next()
                saveCheckoutAddress(values, locale);
                setSubmitting(false);
            }}
            errors={(errors) => {
                console.log(errors)
            }}
        >
            {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                    <Col lg={col ? '12' : col} sm="12" xs="12">
                        <div className="checkout-title">
                            <h3>{t('billing_details')}</h3>
                        </div>
                        <div className="row check-out">
                            {addresses && !isDetails &&
                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                    <div className="field-label d-flex justify-content-between">
                                        <label>{t("shipping_address")}</label>
                                        <Link style={{ color: '#54c3bd' }} href={'/addresses#form'}>{t('add_new_address')}</Link>
                                    </div>
                                    <select name="address" onChange={() => handleAddress(event.target.value)}>
                                        {addresses.map((address, i) => (
                                            <option key={i} value={address.id}>{address.company_name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="company_name">
                                    {t('company_name')}
                                    {errors.company_name && touched.company_name && <span className="error ms-1 text-danger">{errors.company_name}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    type="text"
                                    className="form-control"
                                    id="company_name"
                                    name='company_name'
                                    placeholder={t('inter.company_name')}
                                    onChange={(e) => setFieldValue('company_name', e.target.value)}
                                    value={values.company_name}
                                    required=""
                                />
                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="first_name">
                                    {t('first_name')}
                                    {errors.first_name && touched.first_name && <span className="error ms-1 text-danger">{errors.first_name}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="last_name">
                                    {t('last_name')}
                                    {errors.last_name && touched.last_name && <span className="error ms-1 text-danger">{errors.last_name}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="email">
                                    {t('email')}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder={t('inter.email')}
                                    name="email"
                                />
                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="phone">
                                    {t('phone')}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="state">
                                    {t('state')}
                                    {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    name='state'
                                    placeholder={t('inter.state')}
                                    value={values.state}
                                    onChange={(e) => setFieldValue('state', e.target.value)}
                                    required=""
                                />
                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="address1">
                                    {t("address_label")}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    type="text"
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    placeholder={t("address_label")}
                                    value={values.address1 && values.address1[0]}
                                    onChange={(e) => setFieldValue('address1', [e.target.value])}
                                    required=""
                                />
                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="zip-code">
                                    {t("postcode")}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="country">
                                    {t("country_label")}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="city">
                                    {t("city_label")}
                                </Label>
                                <Field
                                    disabled={isDetails}
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
                            {!isDetails ?
                                <div className="col-md-12">
                                    <button className="btn btn-sm btn-solid" type="submit">{t('next')}</button>
                                </div> : ''
                            }
                        </div>
                    </Col>
                </Form>
            )}
        </Formik>
    )
}

export default AddressForm;