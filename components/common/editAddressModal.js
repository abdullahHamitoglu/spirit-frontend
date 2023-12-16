import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label } from 'reactstrap';
import AddressForm from '../account/addressPageForm';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/helpers/user/userStore';
import addressStore from '@/helpers/address/addressStore';
import * as Yup from 'yup';
import ContactFormLoader from '../layouts/Bags/common/formLoader';
import CustomPhoneInput from '../account/customPhoneInput';
import { isEqual } from 'lodash';

function EditAddressModal(args) {
    const [loading, setLoading] = React.useState(false);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const { query } = useRouter();
    const router = useRouter();
    const [stateLoading, setStateLoading] = useState(false);
    const currentAddressId = query.id;
    const { t } = useTranslation();
    const { locale } = useRouter();
    const { updateAddress, getAddresses } = useUserStore();
    const { getCountries, countries } = addressStore();
    useEffect(() => {
        getCountries(locale);
    }, []);
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string().required(t('this_field_is_required')),
        first_name: Yup.string().required(t('this_field_is_required')),
        last_name: Yup.string().required(t('this_field_is_required')),
        email: Yup.string().email(t('invalid_email')).required(t('this_field_is_required')),
        country: Yup.string().required(t('this_field_is_required')),
        state: Yup.string().required(t('this_field_is_required')),
        city: Yup.string().required(t('this_field_is_required')),
        postcode: Yup.string().required(t('this_field_is_required')),
        phone: Yup.string().required(t('this_field_is_required')),
    });

    const getStatesByCountry = (code) => {
        setCities([]);
        countries.map((country) => {
            if (country.code == code) {
                setStates(country.states);
            }
        })
    };


    const getCitiesByState = (id) => {
        states.map((state) => {
            if (state.id == id) {
                setCities(state.cities);
            }
        })
    };
    console.log(args.address.country);
    useEffect(() => {
        if (countries && args.address && args.address.country) {
            setCities([]);
            countries.map((country) => {
                if (country.code == args.address.country) {
                    setStates(country.states);
                }
            })
            if(args.address.state_id){
                states.map((state) => {
                    if (state.id == args.address.state_id) {
                        setCities(state.cities);
                    }
                })
            }
        }
    }, [countries])
    return (
        <div>
            <Modal {...args} centered backdrop='static' size='xl' >
                <ModalHeader toggle={args.toggle}>
                    {t("address")}
                </ModalHeader>
                <ModalBody className='p-4'>
                    {!args.address ? <ContactFormLoader className="d-flex justify-content-center w-100" /> :
                        <Formik
                            enableReinitialize
                            initialValues={{
                                company_name: args.address.company_name,
                                first_name: args.address.first_name,
                                last_name: args.address.last_name,
                                email: args.address.email,
                                address1: args.address.address1 || [''],
                                country: args.address.country,
                                state: args.state,
                                state_id: args.state_id,
                                city: args.city,
                                city_id: args.city_id,
                                postcode: args.address.postcode,
                                phone: args.address.phone,
                                phone_code: args.address.phone_code,
                                vat_id: args.address.vat_id || ''
                            }}
                            validationSchema={addressValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                updateAddress(values, locale, args.address.id, args.toggle);
                                setSubmitting(false);
                                // args.toggle();
                            }}
                            errors={(errors) => {
                                console.error(errors);
                            }}
                        >
                            {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                                <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center theme-form">
                                    <div className="row check-out g-2">

                                        <Col md="6" sm="12" xs="12" className="form-group">
                                            <Label className="form-label" for="country">
                                                {t("country_label")}
                                                {errors.country && touched.country && <span className="error ms-1 text-danger">{errors.country}</span>}
                                            </Label>
                                            <Field
                                                as="select"
                                                className="form-control"
                                                id="country"
                                                name="country"
                                                placeholder={t("country_label")}
                                                value={values.country}
                                                onChange={(e) => { setFieldValue('country', e.target.value); getStatesByCountry(e.target.value) }}
                                                required=""
                                            >
                                                {countries && countries.map((country, i) => (
                                                    <option key={i} value={country.code} >{country.name}</option>
                                                ))}
                                            </Field>

                                        </Col>
                                        <Col md="6" sm="12" xs="12" className="form-group">
                                            <Label className="form-label" for="state">
                                                {t('state')}
                                                {errors.state && touched.state && <span className="error ms-1 text-danger">{errors.state}</span>}
                                            </Label>
                                            <Field
                                                disabled={states.length <= 0}
                                                as="select"
                                                className="form-control"
                                                id="state"
                                                name="state"
                                                placeholder={t('inter.state')}
                                                value={values.state}
                                                onChange={(e) => {
                                                    let selectedOptionId = e.target.options[e.target.selectedIndex].getAttribute('id');
                                                    setFieldValue('state', e.target.value);
                                                    setFieldValue('state_id', selectedOptionId);
                                                    getCitiesByState(selectedOptionId);
                                                }}
                                                required=""
                                            >
                                                <option value=''>{t("select.state")}</option>
                                                {states && states.map((state, i) => {
                                                    if (args.address.state_id == state.id) {
                                                        return <option key={i} selected value={state.code} id={state.id} data-cities={state.cities}>{state.default_name}</option>
                                                    } else {
                                                        return <option key={i} value={state.code} id={state.id} data-cities={state.cities}>{state.default_name}</option>
                                                    }

                                                }
                                                )}
                                            </Field>
                                        </Col><Col md="6" sm="12" xs="12" className="form-group">
                                            <Label className="form-label" for="city">
                                                {t("city_label")}
                                                {errors.city && touched.city && <span className="error ms-1 text-danger">{errors.city}</span>}
                                            </Label>
                                            <Field
                                                disabled={cities.length <= 0}
                                                as="select"
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                placeholder={t("city_label")}
                                                value={values.city}
                                                onChange={(e) => {
                                                    let selectedOptionId = e.target.options[e.target.selectedIndex].getAttribute('id');
                                                    setFieldValue('city_id', selectedOptionId);
                                                    setFieldValue('city', e.target.value)
                                                }}
                                                required=""
                                            >
                                                <option disabled value='' >{t("select.city")}</option>
                                                {cities && cities.map((city, i) => (
                                                    <option key={i} value={city.code} id={city.id}>{city.default_name}</option>
                                                ))}
                                            </Field>
                                        </Col>
                                        <Col md="6" sm="12" xs="12" className="form-group">
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
                                            <CustomPhoneInput values={values} isDetails={false} setFieldValue={setFieldValue} />
                                        </Col>
                                        <Col md="6" sm="12" xs="12" className="form-group">
                                            <Label className="form-label" for="address1">
                                                {t("address_label")}
                                                {errors.address1 && touched.address1 && <span className="error ms-1 text-danger">{errors.address1}</span>}
                                            </Label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="address1"
                                                name="address1[0]" // Update this line
                                                placeholder={t("address_label")}
                                                value={[values.address1]}
                                                onChange={(e) => setFieldValue('address1', [e.target.value])}
                                            />
                                        </Col>
                                        <Col md="6" sm="12" xs="12" className="form-group">
                                            <Label className="form-label" for="zip-code">
                                                {t("postcode")}
                                                {errors.postcode && touched.postcode && <span className="error ms-1 text-danger">{errors.postcode}</span>}
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
                                        <div className="col-md-12">
                                            <Button className="btn btn-sm btn-solid" type="submit" disabled={isEqual(args.address, values)}>{t('update')}</Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }
                </ModalBody>
            </Modal>
        </div>
    );
}

export default EditAddressModal;