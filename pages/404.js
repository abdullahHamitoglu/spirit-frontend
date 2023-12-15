import React from 'react';
import CommonLayout from '../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
    const {t} = useTranslation();
    return (
        <CommonLayout parent={t("home")} title="404">
            <section className="p-0">
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>{t('page_not_found')}</h2>
                                <Link href="/" className="btn btn-solid">{t('back_to_home')}</Link>
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
  
export default Page404;