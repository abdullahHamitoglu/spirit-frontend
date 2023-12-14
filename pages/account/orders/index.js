import CommonLayout from "@/components/shop/common-layout";
import { CancelOrder, GetOrders } from "@/controllers/orderControler";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import useUserStore from "@/helpers/user/userStore";
import moment from "moment/moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Badge,
    Button,
    Col,
    Container,
    Media,
    PopoverBody,
    PopoverHeader,
    Row,
    UncontrolledPopover,
} from 'reactstrap';
function ordersCom() {
    const [open, setOpen] = useState('');
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const { locale } = useRouter();
    const router = useRouter();
    const { isAuthenticated, token } = useUserStore();
    const { selectedCurrency } = currencyStore()

    const fetchOrders = async () => {
        const response = await GetOrders(locale, token, selectedCurrency.code)
        if (response.length < 0) {
            router.push('/account/login')
        }
        setOrders(response)
    }

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [])
    const cancelOrder = async (id) => {
        const response = await CancelOrder(locale, id, token)
    }
    if (orders.length <= 0) {
        !isAuthenticated && router.push('/account/login');
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <CommonLayout parentLink='/account/dashboard' parent={t("my_account")} title={t("my_orders")}>
            <section className="section-b-space light-layout white-1">
                <Container>
                    <section className="section-b-space">
                        <Accordion flush open={open} toggle={toggle}>
                            {orders.map((order, i) => (
                                <AccordionItem>
                                    <AccordionHeader targetId={i}>
                                        <span className="w-100 text-start">
                                            <Row className="m-0 align-items-center">
                                                #{order.id} - {moment(order.created_at).format('D/M/Y - HH:MM')}
                                                <Badge
                                                    color={order.status == 'pending' ? 'warning' : order.status == 'processing' ? 'info' : order.status == 'canceled' ? 'danger': 'success' }
                                                    pill
                                                    className="col-1 h-100 mx-3"
                                                >
                                                    {order.status}
                                                </Badge>
                                                {order && order.items && order.items.slice(0, 7).map((item, i) =>
                                                    <Media src={item.base_image.small_image_url} width={50} height={50} alt={item.name} className="blur-up lazyload col-1 object-fit-contain" />
                                                )}
                                                {order.items.length > 7 ? '...' : ''}
                                            </Row>
                                        </span>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={i}>
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
                                                    <Col sm="12">
                                                        <Button id="PopoverFocus" type="button" color="danger" className="mt-3 rounded text-capitalize">
                                                            {t('cancel_order')}
                                                            <i className="ms-2 fa fa-trash" aria-hidden="true"></i>
                                                        </Button>
                                                        <UncontrolledPopover
                                                            placement="top"
                                                            target="PopoverFocus"
                                                            trigger="focus"
                                                        >
                                                            <PopoverHeader>
                                                                {t("do_you_want_to_cancel_the_order")}
                                                            </PopoverHeader>
                                                            <PopoverBody>
                                                                <Button block color="danger" className="mt-3 rounded text-capitalize" onClick={() => cancelOrder(order.id)}>
                                                                    {t('yes')}
                                                                </Button>
                                                            </PopoverBody>
                                                        </UncontrolledPopover>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                </Container>
            </section>
        </CommonLayout>
    );
}


export async function getStaticProps(context) {
    const { locale, query } = context;

    return {
        props: {

            ...(await serverSideTranslations(locale)),
        },
    };
}

export default ordersCom;