import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Button, Spinner } from "reactstrap";
import Review from "./review";
import { getProductReviews } from "@/controllers/productsController";
import { useRouter } from "next/router";
import Trans from "@/helpers/Trans";
import RatingForm from "@/components/common/widgets/RatingForm";

const ProductTab = ({ item, reviews }) => {
  const router = useRouter();
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState("description");
  const [reviewsData, setReviewsData] = useState(reviews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { selectedCurrency } = useRouter();
  const loadMoreReviews = async () => {
    setIsLoading(true)
    const response = await getProductReviews(locale, item.id, { page: page }, selectedCurrency.code);
    console.log(response);
    setReviewsData((prevData) => [...prevData, ...response]);
    setPage((prevData) => prevData + 1);
    setIsLoading(false)
  }
  const { t } = useTranslation();
  return (
    <section className="tab-product m-0" id="tabs">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="description" role="tablist">
                  <NavLink className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>
                    {t('tabText.description')}
                  </NavLink>
                </NavItem>
                {item && item.active_ingredient &&
                  <NavItem className="nav nav-tabs" id="ingredient" role="tablist">
                    <NavLink className={activeTab === "ingredient" ? "active" : ""} onClick={() => setActiveTab("ingredient")}>
                      {t('tabText.ingredients')}
                    </NavLink>
                  </NavItem>
                }
                <NavItem className="nav nav-tabs" id="reviews" role="tablist">
                  <NavLink className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
                    {t('tabText.writeReview')}
                  </NavLink>
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
                <TabPane tabId="reviews">
                  {reviewsData && reviewsData.length > 0 &&
                    <>
                      <Review reviews={reviewsData} />
                      {
                        reviewsData.length >= 8 && page ?
                          <>
                            <div className="section-t-space">
                              <div className="text-center">
                                <Row>
                                  <Col xl="12" md="12" sm="12" className="mb-5">
                                    <Button className="load-more" onClick={() => loadMoreReviews()}>
                                      {isLoading && (
                                        <Spinner animation="border" variant="light" />
                                      )}
                                      {Trans('loadMore')}
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </> : ''
                      }
                    </>
                  }
                  <Container>
                    <RatingForm id={item.id} />
                  </Container>
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
