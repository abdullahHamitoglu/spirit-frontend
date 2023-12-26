import React, { useEffect, useState } from 'react';
import CommonLayout from '../components/shop/common-layout';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { getRedirectProduct } from '@/controllers/productsController';

const Page404 = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [oldProduct, setOldProduct] = useState();

    const checkOldProduct = async (second) => {
        const response = await getRedirectProduct(document.location.origin + router.asPath);
        console.log(response);
        if(response.new_url){
            router.push(response.new_url);
            setOldProduct(response.new_url);
        }
    }

    // useEffect(() => {
    //     checkOldProduct();
    // }, []);
    
    return (
        <CommonLayout parent={t("home")} title="404">
            <section className="p-0">
                <Container>
                    <Row>
                        <Col sm="12">
                            {!oldProduct ?
                                <div className="error-section">
                                    <h1>404</h1>
                                    <h2>{t('page_not_found')}</h2>
                                    <Link href="/" className="btn btn-solid">{t('back_to_home')}</Link>
                                </div>
                                :
                                <div className="error-section">
                                    <Spinner
                                        color="#00c2b5"
                                        style={{
                                            color: '#00c2b5',
                                            borderWidth: '.5rem',
                                            height: '5rem',
                                            width: '5rem'
                                        }}
                                    />
                                    <h2>{t('redirecting')}</h2>
                                    <Link href="/" className="btn btn-solid">{t('back_to_home')}</Link>
                                </div>
                            }
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

export default Page404;