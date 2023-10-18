import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import { useUser } from '@/helpers/user/userContext';
import { useRouter } from 'next/router';
const ProfilePage = () => {
    const { t } = useTranslation();
    const { state , updateProfile } = useUser();
    const { user, isAuthenticated } = state;
    
    const router = useRouter();
    if(!isAuthenticated){
        router.push('/page/account/login');
    }
    return (
        <>
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>{t('personal_details')}</h3>
                            <Form className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="name">{t('first_name')}</Label>
                                        <Input type="text" className="form-control" id="first_name" name='first_name' placeholder={t('inter.name')} value={user.first_name}
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="email">{t('last_name')}</Label>
                                        <Input type="text" className="form-control" id="last_name" name='last_name' placeholder={t('inter.name')} required="" value={user.last_name} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">{t('phone')}</Label>
                                        <Input type="number" className="form-control" id="review" name={t('phone')} placeholder={t('inter.number')} value={user.phone}
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="email">Email</Label>
                                        <Input type="email" className="form-control" id="email" placeholder={t('inter.email')} required="" value={user.email} />
                                    </Col>
                                    <Col md="12">
                                        <Label className="form-label" for="review">{t("write_your_message")}</Label>
                                        <textarea className="form-control mb-0" placeholder={t("write_your_message")}
                                            id="exampleFormControlTextarea1" rows="6"></textarea>
                                    </Col>
                                </Row>
                            </Form>
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