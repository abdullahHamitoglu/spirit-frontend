import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import isEqual from "lodash/isEqual";
import useUserStore from '../../helpers/user/userStore';
import { useRouter } from 'next/router';
import CustomPhoneInput from './customPhoneInput';

const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
};

const ProfilePage = ({ userDetails }) => {
    const { updateProfile, addAddress, address } = useUserStore();
    const { t } = useTranslation();
    const { locale } = useRouter()
    const [user, setUser] = useState({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        date_of_birth: formatDate(userDetails.date_of_birth),
        gender: userDetails.gender,
        phone: userDetails.phone,
        phone_code: userDetails.phone_code,
        password: '',
        password_confirmation: ''
    });



    // Assuming you have initialized i18next and set your language file

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required(t('first_name_required')),
        last_name: Yup.string().required(t('last_name_required')),
        password: Yup.string().min(6, t('password_min_length')),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('passwords_must_match')),
    });

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


    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18); // Maximum age is 18 years
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 90); // Maximum age is 90 years

    const maxDateString = maxDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    const minDateString = minDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd

    return (
        <>
            <section className="contact-page register-page mb-5" id='adresses'>
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
                                    phone_code: user.phone_code,
                                    password: '',
                                    password_confirmation: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    updateProfile(values, locale);
                                    setUser({
                                        password: '',
                                        password_confirmation: ''
                                    })
                                    setSubmitting(false);
                                }}
                                on >
                                {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue, setFieldValues, setValue }) => (
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
                                                <CustomPhoneInput values={values} isDetails={false} setFieldValue={setFieldValue} />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="date_of_birth">{t('date_of_birth')}</Label>
                                                <Field type="date" className="form-control" id="date_of_birth" max={maxDateString} min={minDateString} name='date_of_birth' placeholder={t('inter.date_of_birth')} value={values.date_of_birth} onChange={(e) => setFieldValue('date_of_birth', e.target.value)}
                                                    required="" />
                                            </Col>
                                            <Col md="6" className='search-box'>
                                                <label className="form-label" htmlFor="gender">{t('gender')}:</label>
                                                <select className="form-select form-control py-3" size="1" value={values.gender} onChange={(e) => setFieldValue('gender', e.target.value)}>
                                                    <option value="f">{t("female")}</option>
                                                    <option value="m">{t('male')}</option>
                                                </select>
                                            </Col>
                                            <Col md="6" id='change_password'>
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