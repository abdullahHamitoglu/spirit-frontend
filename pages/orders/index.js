import CommonLayout from "@/components/shop/common-layout";
import { GetOrders } from "@/controllers/orderControler";
import useUserStore from "@/helpers/user/userStore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Container,
} from 'reactstrap';
function orders() {
    const [open, setOpen] = useState('');
    const { t } = useTranslation();
    const [orders, setOrders] = useState();
    const { locale } = useRouter();
    const router = useRouter();
    const {isAuthenticated , token } = useUserStore();
    const fetchOrders = async () => {
        const response = await GetOrders(locale ,token)

        setOrders(orders)
    }

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    if (!orders) {
        !isAuthenticated && router.push('/account/login')
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <CommonLayout parent={t("home")} title={t("my-orders")}>
            <section className="section-b-space light-layout white-1">
                <Container>
                    <Accordion flush open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId="1" dir="rtl">Accordion Item 1</AccordionHeader>
                            <AccordionBody accordionId="1">
                                <strong>This is the first item&#39;s accordion body.</strong>
                                You can modify any of this with custom CSS or overriding our default
                                variables. It&#39;s also worth noting that just about any HTML can
                                go within the <code>.accordion-body</code>, though the transition
                                does limit overflow.
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                            <AccordionBody accordionId="2">
                                <strong>This is the second item&#39;s accordion body.</strong>
                                You can modify any of this with custom CSS or overriding our default
                                variables. It&#39;s also worth noting that just about any HTML can
                                go within the <code>.accordion-body</code>, though the transition
                                does limit overflow.
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                            <AccordionBody accordionId="3">
                                <strong>This is the third item&#39;s accordion body.</strong>
                                You can modify any of this with custom CSS or overriding our default
                                variables. It&#39;s also worth noting that just about any HTML can
                                go within the <code>.accordion-body</code>, though the transition
                                does limit overflow.
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </section>
        </CommonLayout>
    );
}



export default orders;