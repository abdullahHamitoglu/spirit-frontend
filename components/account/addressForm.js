import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Container, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import useUserStore from '../../helpers/user/userStore';

function AddressForm() {
    const { t } = useTranslation();
    const { address } = useUserStore();
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required(t('first_name_required')),
        last_name: Yup.string().required(t('last_name_required')),
        password: Yup.string()
            .min(6, t('password_min_length')),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref(' '), null], t('passwords_must_match')),
    });

    
    return (

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
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                address(values);
                                setSubmitting(false);
                            }}
                            on >
                            {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues }) => (
                                <Form className="theme-form">
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
                                            <Field type="email" className="form-control" id="email" placeholder={t('inter.email')} disabled value={user.email} />
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
    )
}

export default AddressForm ;