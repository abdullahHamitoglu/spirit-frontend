import CommonLayout from "@/components/shop/common-layout";
import { getPageData, getPharmacyBranches } from "@/controllers/homeController";
import Trans from "@/helpers/Trans";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Media, Row } from "reactstrap";

function Branches({ branches }) {
    const { t } = useTranslation();
    if (!branches) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{t('branches')}</title>
            </Head>
            <CommonLayout parent={Trans("home")} title={t('branches_pharmacy')}>
                <section className="about-page section-b-space">
                    <Container>
                        <Row>
                            {branches.map((branch) => (
                                <Col sm="6">
                                    <Card className="h-100">
                                        <CardHeader>
                                            {branch.title}
                                        </CardHeader>
                                        <CardBody>
                                            <h6>{branch.address}</h6>
                                            <iframe src={branch.map_path}
                                                width="100%"
                                                height="250"
                                                frameBorder="0"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                aria-hidden="false"
                                                tabIndex="0"
                                            />
                                        </CardBody>
                                        <CardFooter>
                                            <a target="_blank" href={branch.map_path} className="btn-solid d-inline-block btn-sm rounded">
                                                {t('view_detail')}
                                            </a>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </CommonLayout>
        </>
    );
};
export async function getStaticProps(context) {
    const { locale, params } = context;
    const branches = await getPharmacyBranches(locale);
    return {
        props: {
            branches,
            ...(await serverSideTranslations(locale)),
        },
    };
}


export default Branches;