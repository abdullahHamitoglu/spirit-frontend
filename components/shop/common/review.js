import React from "react";
import CommonLayout from "@/components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import RatingForm from "@/components/common/widgets/RatingForm";
import { Rating } from "@mui/material";

const MasterReview = ({ name, datetime, review, rating }) => {
  const timestamp = datetime;
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  }).format(date);

  return (
    <Row className="text-start border-bottom w-100">
      <h6 className='mb-0 mt-3 text-start'>
        <span className="text-black h4">{name} </span>
        <span>({formattedDate})</span>
      </h6>
      <p className=" p-1 px-4 text-start">{review}</p>
      <Rating className="p-2 w-100" name="half-rating-read" defaultValue={rating} precision={0.1} readOnly />
    </Row>
  );
};

const Review = ({ reviews }) => {
  return (
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
                    rating={review.rating}
                  />
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Review;
