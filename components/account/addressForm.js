import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Label } from 'reactstrap';
import * as Yup from 'yup';
import useUserStore from '../../helpers/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCartStore from '@/helpers/cart/cartStore';
import currencyStore from '@/helpers/Currency/CurrencyStore';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function AddressForm({ ctx, col, isDetails, address, checkout }) {
    const { t } = useTranslation();
    const { locale } = useRouter();
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string().required(t('this_field_is_required')),
        first_name: Yup.string().required(t('this_field_is_required')),
        last_name: Yup.string().required(t('this_field_is_required')),
        email: Yup.string().email(t('invalid_email')).required(t('this_field_is_required')),
        address1: Yup.array().required(t('this_field_is_required')),
        state: Yup.string().required(t('this_field_is_required')),
        country: Yup.string().required(t('this_field_is_required')),
        city: Yup.string().required(t('this_field_is_required')),
        postcode: Yup.string().required(t('this_field_is_required')),
        phone: Yup.string().required(t('this_field_is_required')),
    });
    const { saveCheckoutAddress } = useCartStore();
    const { getAddresses, addresses, getAddressById, addAddress } = useUserStore();
    const { getCountries, countries, fetchStates , states } = currencyStore();
    const handleAddress = (id) => {
        getAddressById(locale, id);
    }
    function convertToEnglish(inputString) {
        const charMap = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
            'ş': 's', 'ğ': 'g', 'ç': 'c', 'ı': 'i', 'ö': 'o', // Turkish characters
            // Add more characters as needed
        };

        return inputString.replace(/[áéíóúüşğçıö]/g, match => charMap[match] || match);
    }
    useEffect(() => {
        getAddresses(locale);
        getCountries(locale);
    }, []);

    const getStatesByCountry = (code) => {
        fetchStates(locale, code);
    };

    const getCitiesByState = (cities) => {
        fetchCities(cities);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                company_name: address.company_name || '',
                first_name: address.first_name || '',
                last_name: address.last_name || '',
                email: address.email || '',
                address1: address.address1 || [''],
                country: address.country || '',
                state: address.state || '',
                city: address.city || '',
                postcode: address.postcode || '',
                phone: address.phone || '',
                vat_id: address.vat_i || ''
            }}
            validationSchema={addressValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                let convertedValues = convertToEnglish(JSON.stringify(values));
                if (checkout) {
                    saveCheckoutAddress(JSON.parse(convertedValues), locale);
                } else {
                    addAddress(JSON.parse(convertedValues), locale);
                }
                setSubmitting(false);
                if (ctx) {
                    ctx.next();
                }
            }}
            errors={(errors) => {
                console.log(errors);
            }}
        >
            {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
                    <Col lg={col < 0 ? '12' : col} sm="12" xs="12">
                        <div className="checkout-title">
                            <h3>{t('billing_details')}</h3>
                        </div>
                        <div className="row check-out">
                            {addresses.length > 0 && !isDetails &&
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
                                <Label className="form-label" for="country">
                                    {t("country_label")}
                                    {errors.country && touched.country && <span className="error ms-1 text-danger">{errors.country}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    as="select"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    placeholder={t("country_label")}
                                    value={values.country}
                                    onChange={(e) => {setFieldValue('country', e.target.value); getStatesByCountry(e.target.value)}}
                                    required=""
                                >
                                    <option disabled value=''>{t("select.country")}</option>
                                    {countries && countries.map((country, i) => (
                                        <option key={i} value={country.code}>{country.name}</option>
                                    ))}
                                </Field>

                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="state">
                                    {t('state')}
                                    {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                                </Label>
                                <Field
                                    disabled={isDetails}
                                    as="select"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    placeholder={t('inter.state')}
                                    value={values.state}
                                    onChange={(e) => {setFieldValue('state', e.target.value)}}
                                    required=""
                                >
                                    <option disabled value=''>{t("select.state")}</option>
                                    {console.log(states)}
                                    {states && states.map((state, i) => (
                                        <option key={i} value={state.code}>{state.default_name}</option>
                                    ))}
                                </Field>
                            </Col>
                            <Col md="6" sm="12" xs="12" className="form-group">
                                <Label className="form-label" for="city">
                                    {t("city_label")}
                                    {errors.city && touched.city && <span className="error ms-1 text-danger">{errors.city}</span>}
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
                                    {errors.phone && touched.phone && <span className="error ms-1 text-danger">{errors.phone}</span>}
                                </Label>
                                {/* <PhoneInput
                                    country={'us'}
                                    value={this.state.phone}
                                    onChange={phone => this.setState({ phone })}
                                /> */}
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
                                <Label className="form-label" for="address1">
                                    {t("address_label")}
                                    {errors.address1 && touched.address1 && <span className="error ms-1 text-danger">{errors.address1}</span>}
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
                                    {errors.postcode && touched.postcode && <span className="error ms-1 text-danger">{errors.postcode}</span>}
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