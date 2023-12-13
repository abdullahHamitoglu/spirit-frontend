import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const TopBar = ({ topClass }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div id="topHeader" className={`top-header ${topClass ? topClass : ""}`}>
      <Container>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>{t('welcome_to_our_store_Spirit')}</li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  {t('call_us')}: 
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist compare-mobile">
                <Link href={`/page/compare`}>
                  <i className="fa fa-random" aria-hidden="true"></i>
                  {t('compare')}
                </Link>
              </li>
              <li className="mobile-wishlist">
                <Link href={`/account/wishlist`}>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  {t('wishlist')}
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> {t('my_account')}
                <ul className="onhover-show-div">
                  <li>
                    <Link href={`/account/login?redirect_url=${router.asPath}`}>{t('login')}</Link>
                  </li>
                  <li>
                    <Link href={`/account/register`}>{t('register')}</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
