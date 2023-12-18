import CommonLayout from "@/components/shop/common-layout";
import { getPageData } from "@/controllers/homeController";
import Trans from "@/helpers/Trans";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Col, Container, Media, Row } from "reactstrap";

function Pages({ page }) {
    const { t } = useTranslation();
    if (!page) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <meta name="keywords" content={page.meta_keywords} />
                <meta name="description" content={page.meta_description} />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={page.meta_title} />
                <meta property="og:url" content={page.url} />
                <meta property="og:image" content={page.image} />
                <meta property="og:image:alt" content={page.meta_title} />
                <meta property="og:description" content={page.meta_description} />
                <title>{page.meta_title}</title>
            </Head>
            <CommonLayout parent={t("home")} title={page.title}>
                <section className="about-page section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <h1 className="fs-3 text-center mb-3">{page.title}</h1>
                                <p dangerouslySetInnerHTML={{ __html: page.content }} />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </CommonLayout>
        </>
    );
};
export async function getServerSideProps(context) {
    try {
        const { locale, params } = context;
        const page = await getPageData(locale, params.slug);
        return {
            props: {
                page,
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return {
            notFound: true,
        }
    }
}


export default Pages;