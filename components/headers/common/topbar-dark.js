import React, { useTransition } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import useUserStore from "../../../helpers/user/userStore";

const TopBarDark = ({ topClass, fluid }) => {
  const { isAuthenticated, logout } = useUserStore();
  const { t } = useTranslation();
  const Logout = () => {
    logout();
  };
  const router = useRouter();
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="w-100 text-start">
                <Link href="/blog" className="w-100 text-start">
                  <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                  {t("blog_page")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/account/wishlist">
                  <i className="fa fa-heart" aria-hidden="true"></i> {t("wishlist")}
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> {t("my_account")}
                <ul className="onhover-show-div">
                  {isAuthenticated ?
                    <>
                      <li>
                        <Link href={'/account/dashboard'}>{t('dashboard')}</Link>
                      </li>
                      <li>
                        <Link href={`/account/profile`}>
                          {t('profile')}
                        </Link>
                      </li>
                      <li onClick={() => Logout()}>
                        <a>{t('logout')}</a>
                      </li>
                    </>
                    :
                    <>
                      <li>
                        <Link href={`/account/login?redirect_url=${router.asPath}`}>
                          {t('login')}
                        </Link>
                      </li>
                      <li>
                        <Link href={`/account/register?redirect_url=${router.asPath}`}>
                          {t('register')}
                        </Link>
                      </li>
                    </>
                  }
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
