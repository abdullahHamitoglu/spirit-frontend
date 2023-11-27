import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Media } from "reactstrap";
import Review from "./review";

const ProductTab = ({ item ,reviews}) => {
  const [activeTab, setActiveTab] = useState("description");
  const { t } = useTranslation();
  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>
                    {t('tabText.description')}
                  </NavLink>
                </NavItem>
                {item && item.active_ingredient &&
                  <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                    <NavLink className={activeTab === "ingredient" ? "active" : ""} onClick={() => setActiveTab("ingredient")}>
                      {t('tabText.ingredients')}
                    </NavLink>
                  </NavItem>
                }
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  {item.reviews && item.reviews.total > 0 &&
                    <NavLink className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
                      {t('tabText.writeReview')}
                    </NavLink>
                  }
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                {item && item.description &&
                  <TabPane tabId="description">
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  </TabPane>
                }
                {item && item.active_ingredient &&
                  <TabPane tabId="ingredient">
                    <p dangerouslySetInnerHTML={{ __html: item.active_ingredient }} />
                  </TabPane>
                }
                {item.reviews && item.reviews.total > 0 &&
                  <TabPane tabId="reviews">
                    <Review reviews={reviews} />
                  </TabPane>
                }
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>

  );
};

export default ProductTab;
