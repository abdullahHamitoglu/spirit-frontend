import React, { use, useEffect, useState } from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/helpers/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPageData } from '@/controllers/homeController';
import { getAddresses } from '@/controllers/addressesController';
import nookies, { parseCookies } from 'nookies'

const Dashboard = ({page , addresses }) => {
    const [accountInfo, setAccountInfo] = useState(false);
    const { user, logout, isAuthenticated, deleteAddress } = useUserStore();
    const { t } = useTranslation();
    const { locale } = useRouter();
    const router = useRouter();
    if (!isAuthenticated && !user) {
        router.push({
            pathname: '/account/login',
            locale,
            query: {
                'redirectUrl': router.pathname
            }
        });
    }
    const handleDeleteAddress = (id) => {
        deleteAddress(locale, id);
        // getAddresses(locale);
    }
    useEffect(() => {
        // getAddresses(locale)
        console.log(addresses);
    }, []);
    return (
        <CommonLayout parent={t('home')} title={t('dashboard')}>
            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="3">
                            {window.innerWidth <= 991 ?
                                <div className="account-sidebar" onClick={() => setAccountInfo(!accountInfo)}>
                                    <a className="popup-btn">{t('my_account')}</a>
                                </div>
                                : ""}
                            <div className="dashboard-left" style={accountInfo ? { left: "0px" } : {}}>
                                <div className="collection-mobile-back" onClick={() => setAccountInfo(!accountInfo)}>
                                    <span className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> {t('back')}
                                    </span>
                                </div>
                                <div className="block-content">
                                    <ul>
                                        <li className="active"><a href="/account/profile">{t('account_info')}</a></li>
                                        {/* <li><a href="#">{t('address_book')}</a></li> */}
                                        <li><a href="/account/orders">{t('my_orders')}</a></li>
                                        <li><a href="/account/wishlist">{t('my_wishlist')}</a></li>
                                        <li><a href="/account/newsletter">{t('newsletter')}</a></li>
                                        <li><a href="/account/profile">{t('my_account')}</a></li>
                                        <li><a href="/account/profile#change_password">{t('change_password')}</a></li>
                                        <li className="last"><a onClick={() => logout()} >{t('log_out')}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col lg="9">
                            <div className="dashboard-right">
                                <div className="dashboard">
                                    <div className="page-title">
                                        <h2>{page.title}</h2>
                                    </div>
                                    <div className="welcome-msg">
                                        <p>{page.title}</p>
                                        <p dangerouslySetInnerHTML={{ __html: page.content }} />
                                    </div>
                                    <div className="box-account box-info">
                                        <div className="box-head">
                                            <h2>{t('account_information')}</h2>
                                        </div>
                                        <Row>
                                            <Col sm="6">
                                                <div className="box">
                                                    <div className="box-title">
                                                        <h3>{t('contact_information')}</h3><a href="#">{t('edit')}</a>
                                                    </div>
                                                    <div className="box-content">
                                                        <h6>{user.name} </h6>
                                                        <h6>{user.email}</h6>
                                                        <h6><Link href="/account/profile">{t('change_password_link')}</Link></h6>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="box">
                                                    <div className="box-title">
                                                        <h3>{t('newsletters')}</h3><a href="#">{t('edit')}</a>
                                                    </div>
                                                    <div className="box-content">
                                                        <p>{t('not_subscribed_to_newsletter')}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div>
                                            <div className="box">
                                                <div className="box-title">
                                                    <h3>{t('address_book')}</h3><Link href="/addresses">{t('manage_addresses')}</Link>
                                                </div>
                                                <Row>
                                                    {addresses ? addresses.map((address) => (
                                                        <Col sm="6">
                                                            <h6> {address.company_name}</h6>
                                                            <address>
                                                                <h6 className='text-black'>{t('address_label')}: {address.company_name}</h6>
                                                                {t('name')}: {address.first_name} {address.last_name} <br />
                                                                {t('phone')}: {address.phone} <br />{t('email')}: {address.email} <br />
                                                                {t('address')}: {address.country} / {address.city} / {address.state} {address.postcode} <br />
                                                                {t('address1')}: {address.address1[0]}  <br />
                                                                <Link href={`/addresses/${address.id}`}>{t('edit')}</Link>
                                                                <a className='text-danger ms-2 btn' onClick={() => { handleDeleteAddress(address.id) }}>{t('delete')}</a>
                                                            </address>
                                                        </Col>
                                                    )) : ''}
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export async function getServerSideProps(context) {
    const { locale } = context;
    const cookies = parseCookies(context);

        const addresses = await getAddresses(locale, cookies.token);
    const page = await getPageData(locale, 'dashboard');
    return {
        props: {
            addresses,
            page,
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default Dashboard