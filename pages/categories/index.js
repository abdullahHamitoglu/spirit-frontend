import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCatagories, getCatagoriesTree, getFilterAttr, getProducts } from "@/controllers/productsController";
import { getPageData } from "@/controllers/homeController";
import { parseCookies } from "nookies";
import { Container, Media, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";

import Slider from "react-slick";

import { Product5 } from "@/services/script";
import Image from "next/image";
const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {

  return (
    <Col lg="2" md="6" xs="6">
      <Link href={link}>
        <div className="collection-block">
          <div>
            <Media
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="collection-content">
            <h4>{totalProducts}</h4>
            <h4>{type}</h4>
            {/* <p>{about}</p> */}
          </div>
        </div>
      </Link>
    </Col>
  );
};
const Collection = ({ categories }) => {
  const [childeData, setChildeData] = useState(categories[0].children);
  const [activeTab, setActiveTab] = useState(0)
  const handleClick = (data, i) => {
    setChildeData(data);
    setActiveTab(i);
  }
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row>
            <Col lg="3" className="border p-3">
              <Nav
                card
                pills
                vertical
              >
                {categories && categories.map((data, i) => {
                  return (
                    <NavItem key={i}>
                      <NavLink
                        className="rounded-0 btn text-start"
                        active={activeTab == i}
                        onClick={() => { handleClick(data.children, i) }}
                      >
                        <Image className="me-2" width='25' height="25" src={data.category_icon_path ??(activeTab == i ? '/assets/images/category-light.svg' : '/assets/images/category.svg')} />
                        {data.name}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
            </Col>
            <Col lg={12 - 3}>
              <Row className="partition-collection">
                {childeData && childeData.map((data, i) => {
                  return (
                    <MasterCollection
                      key={i}
                      img={data.image_url}
                      type={data.name}
                      about={data.description}
                      link={`/products?category_id=${data.id}`}
                    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};
export async function getServerSideProps(context) {
  const { locale, params } = context;
  const { token } = parseCookies(context);
  const categories = await getCatagoriesTree(locale);
  const page = await getPageData(locale, "categories");
  return {
    props: {
      page,
      categories,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Collection;
