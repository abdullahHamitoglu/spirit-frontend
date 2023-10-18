import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import Select from 'react-select';
import { useUser } from '../../../../helpers/user/userContext';
import { useRouter } from 'next/router';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
const ProfilePage = ({ userDetails }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState(userDetails);
    const { updateProfile } = useUser();
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18); // Maximum age is 18 years
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 90); // Maximum age is 90 years

    const maxDateString = maxDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    const minDateString = minDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
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
                                    email: user.email,
                                    Date_of_birth : user.Date_of_birth,
                                    gender : user.gender,
                                    phone : user.phone,
                                    password: '',
                                    password_confirmation: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    updateProfile(values);
                                    setSubmitting(false);
                                }} >
                                {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
                                    <Form className="theme-form" onSubmit={handleSubmit}>
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
                                                <Select size="lg" id="gender" name="gender" className='form-control p-0' options={
                                                    [{
                                                        value: 'male',
                                                        label: t('male')
                                                    },
                                                    {
                                                        value: 'female',
                                                        label: t('female')
                                                    }]
                                                } />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="email">{t('email')}</Label>
                                                <Field type="email" className="form-control" id="email" placeholder={t('inter.email')} required="" value={values.email} onChange={(e) => setFieldValue('email', e.target.value)} />
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
                                                <Label className="form-label" for="exampleFormControlTextarea1">{t("write_your_message")}</Label>
                                                <textarea className="form-control mb-0" placeholder={t("write_your_message")}
                                                    id="exampleFormControlTextarea1" rows="6"></textarea>
                                            </Col>
                                            <Col md="12">
                                                <button className={`btn btn-sm mt-4 btn-solid ${isSubmitting ?? 'disabled'}`} type="submit" disabled={isSubmitting}>{isSubmitting ? t('loading'): t('save')}</button>
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
                            <h3>SHIPPING ADDRESS</h3>
                            <Form className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="name">flat / plot</Label>
                                        <Input type="text" className="form-control" id="home-ploat" placeholder="company name"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="name">Address *</Label>
                                        <Input type="text" className="form-control" id="address-two" placeholder="Address"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="email">Zip Code *</Label>
                                        <Input type="number" className="form-control" id="zip-code" placeholder="zip-code"
                                            required="" />
                                    </Col>
                                    <Col md="6" className="select_input">
                                        <Label className="form-label" for="review">Country *</Label>
                                        <select className="form-select py-2" size="1">
                                            <option value="India">India</option>
                                            <option value="UAE">UAE</option>
                                            <option value="U.K">U.K</option>
                                            <option value="US">US</option>
                                        </select>
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">City *</Label>
                                        <Input type="text" className="form-control" id="city" placeholder="City" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">Region/State *</Label>
                                        <Input type="text" className="form-control" id="region-state" placeholder="Region/state"
                                            required="" />
                                    </Col>
                                    <div className="col-md-12">
                                        <button className="btn btn-sm btn-solid" type="submit">Save setting</button>
                                    </div>
                                </Row>
                            </Form>
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