import React, { use, useState } from 'react';
import CommonLayout from '@/components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/helpers/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [accountInfo, setAccountInfo] = useState(false);
    const { user, logout, isAuthenticated } = useUserStore();
    const { t } = useTranslation();
    const router = useRouter();
    if (!isAuthenticated && user) {
        router.push(`/account/login?redirect_url=${router.asPath}`);
    }
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
                                        <li><a href="#">{t('my_account')}</a></li>
                                        <li><a href="#">{t('change_password')}</a></li>
                                        <li className="last"><a onClick={() => logout()} >{t('log_out')}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col lg="9">
                            <div className="dashboard-right">
                                <div className="dashboard">
                                    <div className="page-title">
                                        <h2>{t('my_dashboard')}</h2>
                                    </div>
                                    <div className="welcome-msg">
                                        <p>{t('hello_mark_jecno')}</p>
                                        <p>
                                            {t('from_your_my_account_dashboard')}
                                        </p>
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
                                                    <h3>{t('address_book')}</h3><a href="">{t('manage_addresses')}</a>
                                                </div>
                                                <Row>
                                                    <Col sm="6">
                                                        <h6>{t('default_billing_address')}</h6>
                                                        <address>{t('not_set_default_billing_address')}<br /><a href="#">{t('edit_address')}</a></address>
                                                    </Col>
                                                    <Col sm="6">
                                                        <h6>{t('default_shipping_address')}</h6>
                                                        <address>{t('not_set_default_shipping_address')}<br /><a href="#">{t('edit_address')}</a></address>
                                                    </Col>
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

export default Dashboard