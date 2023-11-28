import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Media } from "reactstrap";
import Review from "./review";
import { getProductReviews } from "@/controllers/productsController";
import { useRouter } from "next/router";

const ProductTab = ({ item, reviews }) => {
  const router = useRouter();
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState("description");
  const [reviewsData, setReviewsData] = useState(reviews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadMoreReviews = () => {
    const response = getProductReviews(locale, item.id, { page: page });
    setReviewsData((prevData)=> [...prevData , response ]);
    setPage((prevData) => prevData + 1);
  }
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
                {reviewsData && reviewsData > 0 &&
                  <TabPane tabId="reviews">
                    <Review reviews={reviewsData} />
                    {
                      reviewsData.total > 0 ?
                        <>
                          <div className="section-t-space">
                            <div className="text-center">
                              <Row>
                                <Col xl="12" md="12" sm="12">
                                  {data && data.products && data.products.hasMore && (
                                    <Button className="load-more" onClick={() => handlePagination()}>
                                      {isLoading && (
                                        <Spinner animation="border" variant="light" />
                                      )}
                                      Load More
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </> : ''
                    }
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
