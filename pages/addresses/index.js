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
import { parseCookies } from 'nookies';
import { getAddresses } from '@/controllers/addressesController';
import { getPageData } from '@/controllers/homeController';
import AddressForm from '@/components/account/addressPageForm';

const Addresses = () => {
    const { locale } = useRouter();
    const router = useRouter();
    const { addresses, addAddress, getAddresses, user, deleteAddress } = useUserStore()
    const { t } = useTranslation();
    const addressValidationSchema = Yup.object().shape({
        company_name: Yup.string().required(t('first_name_required')),
        first_name: Yup.string().required(t('first_name_required')),
        last_name: Yup.string().required(t('first_name_required')),
        email: Yup.string().email(t('invalid_email')).required(t('first_name_required')),
        address1: Yup.array().required(t('first_name_required')),
        state: Yup.string().required(t('first_name_required')),
        city: Yup.string().required(t('first_name_required')),
        postcode: Yup.string().required(t('first_name_required')),
        phone: Yup.string().required(t('first_name_required')),
        vat_id: Yup.string().required(t('first_name_required')),
    });

    useEffect(() => {
        getAddresses(locale);
    }, []);
    const handleDeleteAddress = (id) => {
        deleteAddress(locale, id);
        getAddresses(locale);
    }

    const { isAuthenticated } = useUserStore();

    if (!isAuthenticated && !user) {
        router.push({
            pathname: "/account/login",
            locale,
            query: {
                redirectUrl: router.pathname,
            },
        });
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
                                            <a className='text-danger ms-2' onClick={() => { handleDeleteAddress(address.id) }}>{t('delete')}</a>
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
                                <AddressForm />
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

export default Addresses;