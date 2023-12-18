import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonLayout from '../../components/shop/common-layout';
import BlogList from '@/components/blogs/blog-list';
import { parseCookies } from 'nookies';
import { getPageData } from '@/controllers/homeController';
import { getPosts } from '@/controllers/blogController';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Blog = ({ posts }) => {
  const { t } = useTranslation();
  return (
    <CommonLayout parent={t("home")} title={t("blogs")}>
      <section className="section-b-space blog-page ratio2_3 no-sidebar">
        <Container>
          <Row>
            <Col>
              <BlogList posts={posts} />
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  )
}

export async function getServerSideProps(context) {
  const { locale, query } = context;
  const { token, currencyCode } = parseCookies(context);
  const page = await getPageData(locale, "blogs");
  const posts = await getPosts(locale, currencyCode);

  return {
    props: {
      page,
      posts,
      ...(await serverSideTranslations(locale)),
    },
  };
}


export default Blog;