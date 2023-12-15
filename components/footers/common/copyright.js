import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Media } from 'reactstrap';

const CopyRight = ({ layout, fluid }) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <div className={`sub-footer ${layout}`}>
                <Container fluid={fluid}>
                    <Row>
                        <Col xl="6" md="6" sm="12">
                            <div className="footer-end">
                                <p><i className="fa fa-copyright" aria-hidden="true"></i> {t("copy_right")}</p>
                            </div>
                        </Col>
                        <Col xl="6" md="6" sm="12">
                            <div className="payment-card-bottom">
                                <ul>
                                    <li>
                                        <a><Media height='40' src={'/assets/images/icon/visa.webp'} alt="visa" /></a>
                                    </li>
                                    <li>
                                        <a><Media height='40' src={'/assets/images/icon/mastercard.webp'} alt="mastercard" /></a>
                                    </li>
                                    <li>
                                        <a><Media height='40' src={'/assets/images/icon/knet.webp'} alt="knet" /></a>
                                    </li>
                                    <li>
                                        <a><Media height='40' src={'/assets/images/icon/cash.webp'} alt="knet" /></a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default CopyRight;