import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Media } from 'reactstrap';
import CartContext from '../../helpers/cart';
import useCartStore from '@/helpers/cart/cartStore';
import currencyStore from '@/helpers/Currency/CurrencyStore';
import { GetOrderByID } from '@/controllers/orderControler';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import useUserStore from '@/helpers/user/userStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const OrderSuccess = () => {
    const router = useRouter();
    const { locale } = useRouter();
    const { token } = useUserStore();
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([]);
    const { query } = useRouter();
    const currentAddressId = query.id;
    const { cartData } = useCartStore();
    const cartItems = cartData;
    const { selectedCurrency } = currencyStore();
    const currentId = query.id;
    const getOrder = async () => {
        setLoading(true);
        const response = await GetOrderByID(locale, currentId, token);
        setOrder(response);
        setLoading(false);
    }
    console.log(order);
    useEffect(() => {
        getOrder();
    }, []);
    const { t } = useTranslation();
    if (order.length <= 0) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <CommonLayout parent={t("home")} title={t("order_success")}>
            <section className="section-b-space light-layout white-1">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>{t('thank_you')}</h2>
                                <p>{t('payment_successful')}</p>
                                <p>{t('order_id')}: {order.id}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="product-order">
                                <h3>{t('your_order_details')}</h3>
                                {order && order.items && order.items.map((item, i) =>
                                    <Row className="product-order-detail" key={i}>
                                        <Col xs="3" >
                                            <Media src={item.base_image.original_image_url} alt={item.name}
                                                className="img-fluid blur-up lazyload" />
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>{t('product_name')}</h4>
                                                <h5>{item.name}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>{t("quantity")}</h4>
                                                <h5>{item.qty_ordered}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>{t("price")}</h4>
                                                <h5>{item.formatted_price}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                <div className="total-sec">
                                    <ul>
                                        <li>{t("subtotal")} <span>{order.formatted_base_sub_total}</span></li>
                                    </ul>
                                </div>
                                <div className="total-sec ">
                                    <ul>
                                        <li>{t("total")} <span>{order.formatted_grand_total}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Row className="order-success-sec">
                                <Col sm="6">
                                    <h4>{t("info")}</h4>
                                    <ul className="order-detail">
                                        <li>{t('order_id')}: {order.id}</li>
                                        <li>{t('order_date')}: {order.updated_at}</li>
                                        <li>{t('total')}: {order.formatted_base_grand_total}</li>
                                    </ul>
                                </Col>
                                <Col sm="6">
                                    <h4>{t("shipping_address")}</h4>
                                    <ul className="order-detail">
                                        <li>{order.shipping_address.country_name}</li>
                                        <li>{order.shipping_address.city}</li>
                                        <li>{order.shipping_address.address1[0]}</li>
                                    </ul>
                                </Col>
                                <Col sm="12" className="payment-mode">
                                    <h4>{t('payment_method')}</h4>
                                    <p>{order.payment_title}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '0' } },
        ],
        fallback: true,
    }
}
export async function getStaticProps(context) {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}


export default OrderSuccess;