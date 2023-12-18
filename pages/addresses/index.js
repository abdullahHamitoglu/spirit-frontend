import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Button, CardBody, CardFooter, CardHeader, Col, Container, Label, Row } from 'reactstrap';
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
import EditAddressModal from '@/components/common/editAddressModal';

const Addresses = ({ addresses }) => {
    const { locale } = useRouter();
    const router = useRouter();
    const { addAddress, getAddresses, user, deleteAddress } = useUserStore()
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
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [editableAddress, setEditableAddress] = useState([]);

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
                        <Row>
                            {addresses && addAddress.length > 0 ?
                                addresses.map((address, i) => (
                                    <Col lg='3' sm="12" key={i} className='mb-4'>
                                        <address className='card h-100'>
                                            <CardHeader>
                                                <h6 className='fs-4 p-2 mb-0 text-black'>{address.company_name}</h6>
                                            </CardHeader>
                                            <CardBody>
                                                <p>{t('name')}: {address.first_name} {address.last_name}</p>
                                                <p>{t('phone')}: {address.phone} </p>
                                                <p>{t('email')}: {address.email}</p>
                                                <p>{t('address')}: {address.country} / {address.city} / {address.state} {address.postcode} </p>
                                                <p>{t('address1')}: {address.address1[0]}</p>
                                            </CardBody>
                                            <CardFooter className='row m-0 px-0'>
                                                <Col xs='6'>
                                                    <Button className='btn btn-success d-block w-100 rounded' onClick={() => {
                                                        toggle();
                                                        setEditableAddress(address);
                                                    }} >{t('edit')}
                                                    </Button>
                                                </Col>
                                                <Col xs='6'>
                                                    <Button className='btn btn-danger d-block w-100 rounded' onClick={() => { handleDeleteAddress(address.id) }}>{t('delete')}</Button>
                                                </Col>
                                            </CardFooter>
                                        </address>
                                    </Col>
                                )) : ''}
                            <EditAddressModal toggle={toggle} isOpen={modal} address={editableAddress} />
                        </Row>
                    </Container>
                </section>
                <section className="contact-page register-page section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <h3>{t("shipping_address")}</h3>
                                {!modal &&
                                    <AddressForm />
                                }
                            </Col>
                        </Row>
                    </Container>
                </section>
            </CommonLayout>
        </>
    )
}
export async function getServerSideProps(context) {
    const { locale, query } = context
    const { token } = parseCookies(context)
    const addresses = await getAddresses(locale, token)
    return {
        props: {
            addresses,
            ...(await serverSideTranslations(locale)),
        }
    }
}


export default Addresses;