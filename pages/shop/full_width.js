import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import { Row, Container ,Col} from 'reactstrap';
import Products from "../../components/common/Collections/Collection12";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const FullWidth = () => {
    return (
        <CommonLayout title="collection" parent="home" >
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Products type="metro" col="full" />
                    </Col>
                </Row>
            </Container>
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
  
export default FullWidth;