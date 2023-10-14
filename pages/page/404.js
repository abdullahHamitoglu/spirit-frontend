import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Error = () => {
    return (
        <CommonLayout parent="home" title="404">
            <section className="p-0">
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>page not found</h2>
                                <a href="/" className="btn btn-solid">back to home</a>
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
  
export default Error;