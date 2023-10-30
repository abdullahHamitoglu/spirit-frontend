import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const ProductTab = (item) => {
  const [activeTab, setActiveTab] = useState("1");
  const { t } = useTranslation();
  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => setActiveTab("1")}>
                    {t('tabText.description')}
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => setActiveTab("2")}>
                    {t('tabText.details')}
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => setActiveTab("3")}>
                    {t('tabText.video')}
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "4" ? "active" : ""} onClick={() => setActiveTab("4")}>
                    {t('tabText.writeReview')}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  <p className="mb-0 pb-0" dangerouslySetInnerHTML={{ __html: item.item.description }} />
                </TabPane>
                <TabPane tabId="2">
                  <p className="mb-0 pb-0">{t('tabText.detailsContent')}</p>
                </TabPane>
                <TabPane tabId="3">
                  <p className="mb-0 pb-0">{t('tabText.videoContent')}</p>
                </TabPane>
                <TabPane tabId="4">
                  <p className="mb-0 pb-0">{t('tabText.writeReviewContent')}</p>
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>

  );
};

export default ProductTab;
