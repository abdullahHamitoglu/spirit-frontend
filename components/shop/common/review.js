import React from "react";
import CommonLayout from "@/components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";

const MasterReview = ({ name, datetime, review }) => {
  return (
    <li>
      <div className="media">
        <Media src={`https://ui-avatars.com/api/?name=${name}`} alt="Generic placeholder image" />
        <div className="media-body">
          <h6>
            {name} <span>({datetime})</span>
          </h6>
          <p>{review}</p>
        </div>
      </div>
    </li>
  );
};  

const Review = ({reviews}) => {
  return (
    // <CommonLayout parent="home" title="review">
      <section className="section-b-space blog-detail-page review-page pt-0 border-0">
        <Container>
          <Row>
            <Col sm="12">
              <ul className="comment-section d-flex row">
                {reviews.map((review, i) => {
                  return (
                    <MasterReview
                      key={i}
                      name={review.title}
                      datetime={review.created_at}
                      review={review.comment}
                      likes={review.likes}
                      dislikes={review.dislikes}
                    />
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    // </CommonLayout>
  );
};

export default Review;
