import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from 'next/link';

const Breadcrubs = ({ title, parent, subTitle  , parentLink}) => {
  return (
    <div className="breadcrumb-section">
      <Container>
        <Row>
          <Col sm="12">
            <nav aria-label="breadcrumb" className="theme-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={parentLink ? parentLink : '/'}>{parent}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  {title}
                </li>
                {subTitle === undefined ? (
                  ""
                ) : (
                  <li className="breadcrumb-item active" aria-current="page">
                    {subTitle}
                  </li>
                )}
              </ol>
            </nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Breadcrubs;
