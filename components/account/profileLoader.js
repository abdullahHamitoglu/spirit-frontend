import React from 'react';
import { Container, Row, Col } from 'reactstrap';
const ProfileLoader = ({ userDetails }) => {
    return (
        <>
            <section className="contact-page register-page section-b-space">
                <Container>
                    <Row>
                        <Col sm="12">
                            <Row>
                                <Col md="6">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <Col md="6">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <Col md="6">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <Col md="6" className="select_input">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <Col md="6">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <Col md="6">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </Col>
                                <div className="col-md-12">
                                    <rect className="skeleton-c3" x="0" rx="0" ry="0" />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}


export default ProfileLoader;